// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title ProposalTypes
 * @notice Shared enums and structs for DAO proposals
 */
library ProposalTypes {
    enum ProposalKind {
        INVESTMENT,
        TREASURY_SPEND,
        PARAMETER_CHANGE
    }

    enum ProposalState {
        PENDING,
        ACTIVE,
        SUCCEEDED,
        EXECUTED,
        DEFEATED
    }

    struct Proposal {
        uint256 id;
        ProposalKind kind;
        address proposer;
        address target;
        uint256 value;
        bytes data;
        uint256 voteStart;
        uint256 voteEnd;
        bool executed;
    }
}
