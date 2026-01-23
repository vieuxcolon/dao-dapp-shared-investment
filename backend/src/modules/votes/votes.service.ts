// src/modules/votes/votes.service.ts
import { Injectable } from '@nestjs/common';
import { walletClient } from '../../blockchain/viemClient';
import { governanceContract } from '../../blockchain/contracts';
import { VoteDto } from './dto';

@Injectable()
export class VotesService {
  /* ─────────────────────────────────────────────
   * Cast a vote on a proposal (WRITE)
   * ───────────────────────────────────────────── */
  async castVote(voter: `0x${string}`, data: VoteDto) {
    const txHash: `0x${string}` = await walletClient.writeContract({
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'vote',
      args: [data.proposalId, data.support, data.weight],
      account: voter,
    });

    await walletClient.waitForTransactionReceipt({ hash: txHash });

    return { success: true, txHash };
  }

  /* ─────────────────────────────────────────────
   * Get all votes for a proposal (READ)
   * ───────────────────────────────────────────── */
  async getVotes(proposalId: bigint) {
    return walletClient.readContract({
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'getVotes',
      args: [proposalId],
    });
  }

  /* ─────────────────────────────────────────────
   * Get voting results for a proposal (READ)
   * ───────────────────────────────────────────── */
  async getResults(proposalId: bigint) {
    return walletClient.readContract({
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'getResults',
      args: [proposalId],
    });
  }
}
