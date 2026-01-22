// backend/src/modules/votes/votes.service.ts
import { writeContract, readContract, parseEther } from 'viem';
import { governanceContract, client } from '../../blockchain/contracts';

interface VoteInput {
  proposalId: number;
  voter: `0x${string}`;
  support: boolean;
  weight: number;
}

export class VotesService {
  /**
   * Get votes for a proposal from the blockchain
   * This assumes your contract has a function like `getVotes(proposalId)`
   */
  async getVotes(proposalId: number) {
    return await readContract(client, {
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'getVotes',
      args: [proposalId],
    });
  }

  /**
   * Cast a vote on-chain
   */
  async castVote(data: VoteInput) {
    const tx = await writeContract(client, {
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'vote', // replace with your actual vote function name
      args: [data.proposalId, data.support, data.weight],
    });

    // Wait for transaction to confirm
    const receipt = await tx.wait();
    return { success: true, txHash: receipt.transactionHash };
  }
}
