// backend/src/modules/votes/votes.service.ts
import { governanceContract, client } from '../../blockchain/contracts';

interface VoteInput {
  proposalId: bigint;
  voter: `0x${string}`;
  support: boolean;
  weight: bigint;
}

export class VotesService {
  async getVotes(proposalId: bigint) {
    return await client.readContract({
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'getVotes',
      args: [proposalId],
    });
  }

  async castVote(data: VoteInput) {
    const tx = await client.writeContract({
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'vote', // your vote function in contract
      args: [data.proposalId, data.support, data.weight],
    });

    const receipt = await client.waitForTransactionReceipt({ hash: tx.hash });
    return { success: true, txHash: receipt.transactionHash };
  }
}
