// src/modules/dao/dao.service.ts
import { Injectable } from '@nestjs/common';
import { investmentDAOContract, walletClient } from '../../blockchain/contracts';
import { parseEther } from 'viem';

@Injectable()
export class DaoService {
  async createInvestment(
    creator: `0x${string}`,
    amount: string,
    metadata: string,
  ): Promise<{ success: boolean; txHash: `0x${string}` }> {
    const amountWei = parseEther(amount);

    const txHash: `0x${string}` = await investmentDAOContract.write.createInvestment({
      account: creator,
      args: [amountWei, metadata],
    });

    await walletClient.waitForTransactionReceipt({ hash: txHash });

    return { success: true, txHash };
  }

  async getInvestment(investmentId: bigint) {
    return investmentDAOContract.read.getInvestment([investmentId]);
  }

  async getAllInvestments() {
    return investmentDAOContract.read.getAllInvestments();
  }
}
