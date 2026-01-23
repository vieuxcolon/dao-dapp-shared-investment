// backend/src/modules/votes/votes.service.ts
import { Injectable } from '@nestjs/common';
import { walletClient, publicClient } from '../../blockchain/viemClient';
import { governanceContract } from '../../blockchain/contracts';

/* ─────────────────────────────
 * Vote Data Transfer Object
 * ───────────────────────────── */
export interface VoteDto {
  proposalId: bigint;
  support: boolean;
  weight: bigint;
}

@Injectable()
export class VotesService {
  /* ─────────────────────────────
   * Cast a vote on a proposal (WRITE)
   * ───────────────────────────── */
  async vote(voter: `0x${string}`, data: VoteDto) {
    const txHash: `0x${string}` = await walletClient.writeContract({
      ...governanceContract,
      functionName: 'vote',
      args: [data.proposalId, data.support, data.weight],
      account: voter,
    });

    // Note: in latest viem, walletClient may not have waitForTransactionReceipt
    // So using publicClient here
    await publicClient.waitForTransactionReceipt({ hash: txHash });

    return { success: true, txHash };
  }

  /* ─────────────────────────────
   * Get all votes for a proposal (READ)
   * ───────────────────────────── */
  async getVotes(proposalId: bigint) {
    return publicClient.readContract({
      ...governanceContract,
      functionName: 'getVotes',
      args: [proposalId],
    });
  }

  /* ─────────────────────────────
   * Get voting results for a proposal (READ)
   * ───────────────────────────── */
  async getResults(proposalId: bigint) {
    return publicClient.readContract({
      ...governanceContract,
      functionName: 'getResults',
      args: [proposalId],
    });
  }
}
