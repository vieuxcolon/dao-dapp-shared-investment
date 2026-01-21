// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./ProposalTypes.sol";

/**
 * @title Governance
 * @notice ERC20-based governance with proposal & voting logic
 */
abstract contract Governance is ERC20 {
    using ProposalTypes for ProposalTypes.Proposal;

    uint256 public quorumPercentage;
    uint256 public proposalCount;

    struct Proposal {
        string description;
        address proposer;
        ProposalTypes.ProposalType proposalType;
        address target;
        uint256 amount;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 deadline;
        bool executed;
        mapping(address => bool) hasVoted;
    }

    mapping(uint256 => Proposal) public proposals;

    event ProposalCreated(
        uint256 indexed proposalId,
        address indexed proposer,
        ProposalTypes.ProposalType proposalType
    );

    event VoteCast(
        uint256 indexed proposalId,
        address indexed voter,
        bool support,
        uint256 weight
    );

    /**
     * @param name_ Token name
     * @param symbol_ Token symbol
     * @param _quorumPercentage Required quorum (e.g. 20 = 20%)
     */
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 _quorumPercentage
    ) ERC20(name_, symbol_) {
        require(_quorumPercentage > 0 && _quorumPercentage <= 100, "Invalid quorum");
        quorumPercentage = _quorumPercentage;
    }

    /**
     * @notice Create a new proposal
     */
    function createProposal(
        string calldata description,
        ProposalTypes.ProposalType proposalType,
        address target,
        uint256 amount,
        uint256 votingPeriod
    ) external returns (uint256) {
        require(balanceOf(msg.sender) > 0, "Not a DAO member");

        proposalCount++;
        Proposal storage proposal = proposals[proposalCount];

        proposal.description = description;
        proposal.proposer = msg.sender;
        proposal.proposalType = proposalType;
        proposal.target = target;
        proposal.amount = amount;
        proposal.deadline = block.timestamp + votingPeriod;

        emit ProposalCreated(proposalCount, msg.sender, proposalType);
        return proposalCount;
    }

    /**
     * @notice Vote on a proposal (token-weighted)
     */
    function vote(uint256 proposalId, bool support) external {
        Proposal storage proposal = proposals[proposalId];

        require(block.timestamp < proposal.deadline, "Voting ended");
        require(!proposal.hasVoted[msg.sender], "Already voted");

        uint256 weight = balanceOf(msg.sender);
        require(weight > 0, "No voting power");

        proposal.hasVoted[msg.sender] = true;

        if (support) {
            proposal.votesFor += weight;
        } else {
            proposal.votesAgainst += weight;
        }

        emit VoteCast(proposalId, msg.sender, support, weight);
    }

    /**
     * @notice Check whether proposal passed
     */
    function proposalPassed(uint256 proposalId) public view returns (bool) {
        Proposal storage proposal = proposals[proposalId];

        uint256 totalVotes = proposal.votesFor + proposal.votesAgainst;
        uint256 supply = totalSupply();

        if (supply == 0) return false;

        uint256 quorumVotes = (supply * quorumPercentage) / 100;

        return
            totalVotes >= quorumVotes &&
            proposal.votesFor > proposal.votesAgainst &&
            block.timestamp >= proposal.deadline;
    }
}

