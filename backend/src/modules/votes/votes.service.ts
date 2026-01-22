// backend/src/modules/votes/votes.service.ts
import { writeContract, readContract, waitForTransaction } from 'viem';
import { governanceContract, client } from '../../blockchain/contracts';

export interface VoteInput {
  proposalId: number;
  voter: `0x${string}`;
  support: boolean;
  weight: bigint; // weight in smallest units
}

export class VotesService {
  // Get votes for a proposal from the blockchain
  async getVotes(proposalId: bigint) {
    return readContract(client, {
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'getVotes',
      args: [proposalId],
    });
  }

  // Cast a vote on-chain
  async castVote(data: VoteInput) {
    const txHash = await writeContract({
      client,
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'vote',
      args: [data.proposalId, data.support, data.weight],
      account: data.voter,
    });

    await waitForTransaction(client, { hash: txHash });
    return { success: true, txHash };
  }
}

