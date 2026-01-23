import { Injectable } from '@nestjs/common';
import { walletClient, publicClient } from '../../blockchain/viemClient';
import { governanceContract } from '../../blockchain/contracts';
import { CreateProposalDto, VoteDto } from './dto';

@Injectable()
export class ProposalsService {
  async createProposal(
    signer: `0x${string}`,
    data: CreateProposalDto,
  ): Promise<{ success: boolean; txHash: `0x${string}` }> {
    const txHash = await walletClient.writeContract({
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'createProposal',
      args: [data.title, data.description],
      account: signer,
    });

    await walletClient.waitForTransactionReceipt({ hash: txHash });

    return { success: true, txHash };
  }

  async vote(
    voter: `0x${string}`,
    data: VoteDto,
  ): Promise<{ success: boolean; txHash: `0x${string}` }> {
    const txHash = await walletClient.writeContract({
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'vote',
      args: [data.proposalId, data.support, data.weight],
      account: voter,
    });

    await walletClient.waitForTransactionReceipt({ hash: txHash });

    return { success: true, txHash };
  }

  async getProposal(proposalId: bigint) {
    return publicClient.readContract({
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'getProposal',
      args: [proposalId],
    });
  }

  async getVotes(proposalId: bigint) {
    return publicClient.readContract({
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'getVotes',
      args: [proposalId],
    });
  }

  async getResults(proposalId: bigint) {
    return publicClient.readContract({
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'getResults',
      args: [proposalId],
    });
  }
}
