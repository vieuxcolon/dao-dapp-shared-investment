// src/modules/proposals/proposals.service.ts
import { Injectable } from '@nestjs/common';
import { walletClient, publicClient } from '../../blockchain/viemClient';
import { governanceContract } from '../../blockchain/contracts';
import { CreateProposalDto, VoteDto } from './dto';

@Injectable()
export class ProposalsService {
  /* ─────────────────────────────────────────────
   * Create a new proposal (WRITE)
   * ───────────────────────────────────────────── */
  async createProposal(
    signer: `0x${string}`,
    data: CreateProposalDto,
  ): Promise<{ success: boolean; txHash: `0x${string}` }> {
    const txHash: `0x${string}` = await walletClient.writeContract({
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'createProposal',
      args: [data.title, data.description],
      account: signer,
    });

    await walletClient.waitForTransactionReceipt({ hash: txHash });

    return { success: true, txHash };
  }

  /* ─────────────────────────────────────────────
   * Vote on a proposal (WRITE)
   * ───────────────────────────────────────────── */
  async vote(
    voter: `0x${string}`,
    data: VoteDto,
  ): Promise<{ success: boolean; txHash: `0x${string}` }> {
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
   * Get a single proposal (READ)
   * ───────────────────────────────────────────── */
  async getProposal(proposalId: bigint) {
    return publicClient.readContract({
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'getProposal',
      args: [proposalId],
    });
  }

  /* ─────────────────────────────────────────────
   * Get votes for a proposal (READ)
   * ───────────────────────────────────────────── */
  async getVotes(proposalId: bigint) {
    return publicClient.readContract({
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'getVotes',
      args: [proposalId],
    });
  }

  /* ─────────────────────────────────────────────
   * Get results for a proposal (READ)
   * ───────────────────────────────────────────── */
  async getResults(proposalId: bigint) {
    return publicClient.readContract({
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'getResults',
      args: [proposalId],
    });
  }
}
