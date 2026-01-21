// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "../ProposalTypes.sol";

/**
 * @title IInvestmentDAO
 * @notice Public interface for the Investment DAO
 */
interface IInvestmentDAO {
    // --- Events ---

    event ProposalCreated(
        uint256 indexed proposalId,
        ProposalTypes.ProposalKind kind,
        address indexed proposer
    );

    event VoteCast(
        uint256 indexed proposalId,
        address indexed voter,
        uint256 weight
    );

    event ProposalExecuted(uint256 indexed proposalId);

    // --- DAO lifecycle ---

    function createProposal(
        ProposalTypes.ProposalKind kind,
        address target,
        uint256 value,
        bytes calldata data
    ) external returns (uint256);

    function vote(uint256 proposalId, uint256 weight) external;

    function executeProposal(uint256 proposalId) external;

    // --- Views ---

    function getProposal(uint256 proposalId)
        external
        view
        returns (ProposalTypes.Proposal memory);

    function proposalCount() external view returns (uint256);
}
