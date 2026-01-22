// backend/src/modules/dao/dao.service.ts
import { parseEther } from 'viem';
import { daoContract, client, walletClient } from '../../blockchain/contracts';

export class DAOService {
  // Create a new investment
  async createInvestment(amount: string, investor: `0x${string}`) {
    const tx = await walletClient.writeContract({
      client: walletClient,
      address: daoContract.address,
      abi: daoContract.abi,
      functionName: 'createInvestment',
      args: [parseEther(amount)],
      account: investor,
    });

    return { success: true, txHash: tx.hash };
  }

  // Fetch all investments
  async getInvestments(): Promise<any[]> {
    const investments = await client.readContract({
      address: daoContract.address,
      abi: daoContract.abi,
      functionName: 'getInvestments',
    });

    return investments;
  }
}

