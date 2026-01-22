// backend/src/modules/dao/dao.service.ts
import {
  readContract,
  writeContract,
  parseEther,
} from 'viem';
import { daoContract, client } from '../../blockchain/contracts';

export class DAOService {
  // Create a new investment
  async createInvestment(amount: string, investor: `0x${string}`) {
    try {
      const tx = await writeContract({
        client,
        address: daoContract.address,
        abi: daoContract.abi,
        functionName: 'createInvestment',
        args: [parseEther(amount)],
        account: investor,
      });

      return { success: true, txHash: tx.hash };
    } catch (err) {
      console.error('Error creating investment:', err);
      throw err;
    }
  }

  // Fetch all investments
  async getInvestments(): Promise<any[]> {
    try {
      const investments = await readContract({
        client,
        address: daoContract.address,
        abi: daoContract.abi,
        functionName: 'getInvestments',
      });

      return investments;
    } catch (err) {
      console.error('Error fetching investments:', err);
      throw err;
    }
  }
}
