// src/modules/proposals/proposals.service.ts
import { Injectable } from '@nestjs/common';
import { governanceContract, walletClient } from '../../blockchain/contracts';
import { Account } from 'viem';
import { CreateProposalDto, VoteDto } from './dto';

// Replace with the actual signer address from your wallet client or environment
const SIGNER_ADDRESS = process.env.SIGNER_ADDRESS as `0x${string}`;

@Injectable()
export class ProposalsService {
  constructor() {}

  // ────────────── CREATE PROPOSAL ──────────────
  async createProposal(data: CreateProposalDto) {
    if (!SIGNER_ADDRESS) throw new Error('Signer address is not defined');

    const txHash = await governanceContract.write.createProposal({
      account: SIGNER_ADDRESS,
      args: [data.title, data.description],
    });

    // Wait for transaction confirmation
    await walletClient.waitForTransactionReceipt({ hash: txHash });

    return { success: true, txHash };
  }

  // ────────────── VOTE ON PROPOSAL ──────────────
  async voteOnProposal(data: VoteDto) {
    if (!SIGNER_ADDRESS) throw new Error('Signer address is not defined');

    const txHash = await governanceContract.write.vote({
      account: SIGNER_ADDRESS,
      args: [data.proposalId, data.support, data.weight],
    });

    // Wait for transaction confirmation
    await walletClient.waitForTransactionReceipt({ hash: txHash });

    return { success: true, txHash };
  }

  // ────────────── READ PROPOSAL ──────────────
  async getProposal(proposalId: bigint) {
    const proposal = await governanceContract.read.getProposal([proposalId]);
    return proposal;
  }

  // ────────────── READ VOTES ──────────────
  async getVotes(proposalId: bigint) {
    const votes = await governanceContract.read.getVotes([proposalId]);
    return votes;
  }
}

