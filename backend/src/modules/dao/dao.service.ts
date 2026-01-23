// src/modules/dao/dao.service.ts
import { Injectable } from '@nestjs/common';
import { walletClient, investmentDAOContract } from '../../blockchain/contracts';
import { parseEther } from 'viem';

@Injectable()
export class DaoService {
  constructor() {}

  // ────────────── CREATE INVESTMENT ──────────────
  async createInvestment(
    creator: `0x${string}`,
    amount: string,
    metadata: string,
  ): Promise<{ success: boolean; txHash: `0x${string}` }> {
    // Convert amount to bigint (wei)
    const amountWei = parseEther(amount);

    // Execute write transaction
    const txHash: `0x${string}` = await investmentDAOContract.write.createInvestment({
      account: creator,
      args: [amountWei, metadata],
    });

    // Wait for transaction confirmation
    await walletClient.waitForTransactionReceipt({ hash: txHash });

    return { success: true, txHash };
  }

  // ────────────── GET INVESTMENT ──────────────
  async getInvestment(investmentId: bigint) {
    // Read-only call
    return investmentDAOContract.read.getInvestment([investmentId]);
  }

  // ────────────── GET ALL INVESTMENTS ──────────────
  async getAllInvestments() {
    return investmentDAOContract.read.getAllInvestments();
  }
}
