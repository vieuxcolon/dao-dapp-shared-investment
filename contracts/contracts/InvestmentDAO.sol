// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./Governance.sol";
import "./Treasury.sol";
import "./ProposalTypes.sol";

/**
 * @title InvestmentDAO
 * @author DAO DApp Team
 *
 * @notice
 * Core contract orchestrating shared investment, governance,
 * voting, and treasury execution.
 */
contract InvestmentDAO is Governance {
    Treasury public treasury;

    event TreasuryInitialized(address treasury);
    event FundsDeposited(address indexed from, uint256 amount);

    /**
     * @param _name ERC20 token name
     * @param _symbol ERC20 token symbol
     * @param _quorum Minimum quorum percentage (e.g. 20 = 20%)
     */
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _quorum
    ) Governance(_name, _symbol, _quorum) {
        treasury = new Treasury(address(this));
        emit TreasuryInitialized(address(treasury));
    }

    /**
     * @notice Deposit ETH into the DAO and receive governance tokens.
     * 1 ETH = 1 DAO token (simple model).
     */
    function deposit() external payable {
        require(msg.value > 0, "No ETH sent");

        _mint(msg.sender, msg.value);
        treasury.deposit{value: msg.value}();

        emit FundsDeposited(msg.sender, msg.value);
    }

    /**
     * @notice Execute a proposal after it has passed voting.
     */
    function executeProposal(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];

        require(!proposal.executed, "Already executed");
        require(proposalPassed(proposalId), "Proposal not passed");

        proposal.executed = true;

        if (proposal.proposalType == ProposalTypes.ProposalType.TRANSFER) {
            treasury.executeTransfer(
                proposal.target,
                proposal.amount
            );
        } else {
            revert("Unsupported proposal type");
        }
    }
}
