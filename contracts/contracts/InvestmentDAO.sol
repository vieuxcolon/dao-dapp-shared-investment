// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./Governance.sol";
import "./Treasury.sol";
import "./ProposalTypes.sol";

/**
 * @title InvestmentDAO
 * @notice ERC20-based DAO managing investments and treasury
 */
contract InvestmentDAO is Governance {
    Treasury public treasury;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 _quorumPercentage,
        address treasuryAddress
    ) Governance(name_, symbol_, _quorumPercentage) {
        require(treasuryAddress != address(0), "Invalid treasury address");
        treasury = Treasury(treasuryAddress);
    }

    /**
     * @notice Execute a passed proposal
     */
    function executeProposal(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];

        require(proposalPassed(proposalId), "Proposal not passed");
        require(!proposal.executed, "Proposal already executed");

        if (proposal.proposalType == ProposalTypes.ProposalKind.TREASURY_SPEND) {
            // Release ETH from treasury
            treasury.releaseFunds(payable(proposal.target), proposal.amount);
        }

        // Add future cases for other proposal types here
        // e.g., PARAMETER_CHANGE, INVESTMENT, etc.

        proposal.executed = true;
    }

    /**
     * @notice Deposit ETH into DAO treasury
     */
    function depositToTreasury() external payable {
        require(msg.value > 0, "Must send ETH");
        (bool success, ) = address(treasury).call{value: msg.value}("");
        require(success, "ETH deposit failed");
    }
}
