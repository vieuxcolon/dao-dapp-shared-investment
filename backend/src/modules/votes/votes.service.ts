// src/modules/votes/votes.service.ts
import { Injectable } from '@nestjs/common';
import { governanceContract, walletClient } from '../../blockchain/contracts';
import { Account } from 'viem';
import { VoteDto } from './dto';

// Replace with the actual signer address from your wallet client or environment
const SIGNER_ADDRESS = process.env.SIGNER_ADDRESS as `0x${string}`;

@Injectable()
export class VotesService {
  constructor() {}

  // ────────────── CAST VOTE ──────────────
  async castVote(data: VoteDto) {
    if (!SIGNER_ADDRESS) throw new Error('Signer address is not defined');

    // Write vote transaction
    const txHash = await governanceContract.write.vote({
      account: SIGNER_ADDRESS,
      args: [data.proposalId, data.support, data.weight],
    });

    // Wait for confirmation
    await walletClient.waitForTransactionReceipt({ hash: txHash });

    return { success: true, txHash };
  }

  // ────────────── GET VOTES FOR PROPOSAL ──────────────
  async getVotes(proposalId: bigint) {
    const votes = await governanceContract.read.getVotes([proposalId]);
    return votes;
  }

  // ────────────── GET VOTING RESULTS ──────────────
  async getResults(proposalId: bigint) {
    const results = await governanceContract.read.getResults([proposalId]);
    return results;
  }
}
