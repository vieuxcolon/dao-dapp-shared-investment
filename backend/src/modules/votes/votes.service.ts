// src/modules/votes/votes.service.ts
import { Injectable } from '@nestjs/common';
import { walletClient, governanceContract } from '../../blockchain/contracts';
import { VoteDto } from './dto';

@Injectable()
export class VotesService {
  async vote(voter: `0x${string}`, data: VoteDto) {
    const txHash: `0x${string}` = await governanceContract.write.vote({
      account: voter,
      args: [data.proposalId, data.support, data.weight],
    });

    await walletClient.waitForTransactionReceipt({ hash: txHash });

    return { success: true, txHash };
  }

  async getVotes(proposalId: bigint) {
    return governanceContract.read.getVotes([proposalId]);
  }

  async getResults(proposalId: bigint) {
    return governanceContract.read.getResults([proposalId]);
  }
}

