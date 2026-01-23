// src/modules/dao/dao.service.ts
import { parseEther } from 'viem';
import { client, investmentDAOContract } from '../../blockchain/contracts';

export class DAOService {
  // ─────────────────────────────────────────────
  // Create a new investment
  // ─────────────────────────────────────────────
  async createInvestment(amount: string, investor: `0x${string}`) {
    const hash = await client.writeContract({
      ...investmentDAOContract,
      functionName: 'createInvestment',
      args: [parseEther(amount)],
      account: investor,
    });

    await client.waitForTransactionReceipt({ hash });

    return { success: true, txHash: hash };
  }

  // ─────────────────────────────────────────────
  // Fetch all investments
  // ─────────────────────────────────────────────
  async getInvestments(): Promise<any[]> {
    const investments = await client.readContract({
      ...investmentDAOContract,
      functionName: 'getInvestments',
    });

    return investments as any[];
  }
}
