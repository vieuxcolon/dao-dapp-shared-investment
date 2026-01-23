/* ─────────────────────────────────────────────
 * Proposal Module Types
 * ───────────────────────────────────────────── */

/**
 * Proposal stored off-chain
 */
export interface Proposal {
  id: bigint;
  title: string;
  description: string;
  proposer: `0x${string}`;
  createdAt: number;
}

/**
 * CreateProposal DTO
 */
export interface CreateProposalDto {
  title: string;
  description: string;
  proposer: `0x${string}`;
}

/**
 * Vote DTO
 */
export interface VoteDto {
  proposalId: bigint;
  voter: `0x${string}`;
  support: boolean; // true = yes, false = no
}

/**
 * On-chain transaction result
 */
export interface ProposalTxResult {
  txHash: `0x${string}`;
  status: 'pending' | 'success' | 'failed';
}
