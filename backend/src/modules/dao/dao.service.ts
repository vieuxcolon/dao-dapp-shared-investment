//backend/src/modules/dao/dao.service.ts
import { publicClient, walletClient } from '../../blockchain/viemClient';
import { investmentDAOContract } from '../../blockchain/contracts';

/**
 * Temporary domain type until DB layer exists
 */
export interface Investment {
  id: bigint;
  creator: `0x${string}`;
  amount: bigint;
  timestamp: bigint;
}

export class DaoService {
  /**
   * Creates a new investment via the DAO contract
   */
  async createInvestment(amount: bigint): Promise<void> {
    const txHash = await walletClient.writeContract({
      ...investmentDAOContract,
      functionName: 'createInvestment',
      args: [amount],
    });

    //  viem v1+: receipt is fetched from publicClient
    await publicClient.waitForTransactionReceipt({ hash: txHash });
  }

  /**
   * Reads investments from chain
   * (placeholder until indexed storage exists)
   */
  async getInvestments(): Promise<Investment[]> {
    const result = await publicClient.readContract({
      ...investmentDAOContract,
      functionName: 'getInvestments',
    });

    // ABI-decoded but backend does not persist yet
    return result as Investment[];
  }
}
