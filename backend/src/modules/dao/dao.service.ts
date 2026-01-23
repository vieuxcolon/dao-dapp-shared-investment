//backend/src/modules/dao/dao.service.ts
import { publicClient, walletClient } from '../../blockchain/viemClient';
import { investmentDAOContract } from '../../blockchain/contracts';

export interface Investment {
  id: bigint;
  creator: `0x${string}`;
  amount: bigint;
  timestamp: bigint;
}

export class DaoService {
  /**
   * Creates a new investment via the DAO contract
   * @param signer Wallet address executing the transaction
   * @param amount Amount to invest
   */
  async createInvestment(
    signer: `0x${string}`,
    amount: bigint
  ): Promise<{ success: boolean; txHash: `0x${string}` }> {
    const txHash: `0x${string}` = await walletClient.writeContract({
      ...investmentDAOContract,
      functionName: 'createInvestment',
      args: [amount],
      account: signer,
    });

    await publicClient.waitForTransactionReceipt({ hash: txHash });

    return { success: true, txHash };
  }

  /**
   * Reads all investments from the DAO contract
   */
  async getInvestments(): Promise<Investment[]> {
    const result = await publicClient.readContract({
      ...investmentDAOContract,
      functionName: 'getInvestments',
    });

    return result as Investment[];
  }
}
