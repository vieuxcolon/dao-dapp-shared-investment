// src/modules/proposals/proposals.service.ts
import { Injectable } from '@nestjs/common';
import { walletClient, governanceContract } from '../../blockchain/contracts';
import { CreateProposalDto, VoteDto } from './dto';

@Injectable()
export class ProposalsService {
  async createProposal(
    signer: `0x${string}`,
    data: CreateProposalDto,
  ): Promise<{ success: boolean; txHash: `0x${string}` }> {
    const txHash: `0x${string}` = await governanceContract.write.createProposal({
      account: signer,
      args: [data.title, data.description],
    });

    await walletClient.waitForTransactionReceipt({ hash: txHash });

    return { success: true, txHash };
  }

  async vote(
    voter: `0x${string}`,
    data: VoteDto,
  ): Promise<{ success: boolean; txHash: `0x${string}` }> {
    const txHash: `0x${string}` = await governanceContract.write.vote({
      account: voter,
      args: [data.proposalId, data.support, data.weight],
    });

    await walletClient.waitForTransactionReceipt({ hash: txHash });

    return { success: true, txHash };
  }

  async getProposal(proposalId: bigint) {
    return governanceContract.read.getProposal([proposalId]);
  }

  async getVotes(proposalId: bigint) {
    return governanceContract.read.getVotes([proposalId]);
  }

  async getResults(proposalId: bigint) {
    return governanceContract.read.getResults([proposalId]);
  }
}

