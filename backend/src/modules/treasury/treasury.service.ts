// backend/src/modules/treasury/treasury.service.ts
import {
  readContract,
  writeContract,
  parseEther,
  formatEther,
} from 'viem';
import { treasuryContract, client } from '../../blockchain/contracts';

export class TreasuryService {
  // Get current treasury balance
  async getBalance(): Promise<string> {
    try {
      const balance = await readContract({
        client,
        address: treasuryContract.address,
        abi: treasuryContract.abi,
        functionName: 'getTreasuryBalance',
      });

      // readContract returns a bigint or number depending on the function
      return formatEther(balance as bigint);
    } catch (err) {
      console.error('Error fetching treasury balance:', err);
      throw err;
    }
  }

  // Deposit funds into treasury
  async depositFunds(amount: string, depositor: `0x${string}`): Promise<any> {
    try {
      const tx = await writeContract({
        client,
        address: treasuryContract.address,
        abi: treasuryContract.abi,
        functionName: 'deposit',
        args: [],
        value: parseEther(amount),
      });

      return { success: true, txHash: tx.hash };
    } catch (err) {
      console.error('Error depositing funds:', err);
      throw err;
    }
  }

  // Withdraw funds from treasury
  async withdrawFunds(amount: string, recipient: `0x${string}`): Promise<any> {
    try {
      const tx = await writeContract({
        client,
        address: treasuryContract.address,
        abi: treasuryContract.abi,
        functionName: 'withdraw',
        args: [parseEther(amount), recipient],
      });

      return { success: true, txHash: tx.hash };
    } catch (err) {
      console.error('Error withdrawing funds:', err);
      throw err;
    }
  }
}
