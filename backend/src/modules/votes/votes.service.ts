// backend/src/modules/votes/votes.service.ts
import {
  governanceContract,
  client,
  walletClient,
} from '../../blockchain/contracts';

interface VoteInput {
  proposalId: bigint;
  support: boolean;
  weight: bigint;
}

export class VotesService {
  async getVotes(proposalId: bigint) {
    return governanceContract.read.getVotes([proposalId]);
  }

  async castVote(data: VoteInput) {
    const hash = await walletClient.writeContract({
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'vote',
      args: [data.proposalId, data.support, data.weight],
    });

    const receipt = await client.waitForTransactionReceipt({ hash });

    return {
      success: true,
      txHash: receipt.transactionHash,
    };
  }
}
