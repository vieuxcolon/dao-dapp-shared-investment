// src/modules/dao/dao.service.ts
import { Injectable } from '@nestjs/common';
import { publicClient, walletClient } from '../../blockchain/viemClient';
import { investmentDAOContract } from '../../blockchain/contracts';

@Injectable()
export class DaoService {
  /* ─────────────────────────────────────────────
   * Create investment (WRITE)
   * ───────────────────────────────────────────── */
  async createInvestment(
    name: string,
    amount: bigint,
    signer: `0x${string}`,
  ): Promise<{ txHash: `0x${string}` }> {
    const txHash = await walletClient.writeContract({
      address: investmentDAOContract.address,
      abi: investmentDAOContract.abi,
      functionName: 'createInvestment',
      args: [name, amount],
      account: signer,
    });

    await publicClient.waitForTransactionReceipt({ hash: txHash });

    return { txHash };
  }

  /* ─────────────────────────────────────────────
   * Get single investment (READ)
   * ───────────────────────────────────────────── */
  async getInvestment(investmentId: bigint) {
    return publicClient.readContract({
      address: investmentDAOContract.address,
      abi: investmentDAOContract.abi,
      functionName: 'getInvestment',
      args: [investmentId],
    });
  }

  /* ─────────────────────────────────────────────
   * Get all investments (READ)
   * ───────────────────────────────────────────── */
  async getAllInvestments() {
    return publicClient.readContract({
      address: investmentDAOContract.address,
      abi: investmentDAOContract.abi,
      functionName: 'getAllInvestments',
      args: [],
    });
  }
}
