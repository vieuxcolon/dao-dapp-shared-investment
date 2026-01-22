// backend/src/modules/treasury/treasury.service.ts
import { readContract, writeContract, waitForTransaction, parseEther, formatEther } from 'viem';
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

      return formatEther(balance as bigint);
    } catch (err) {
      console.error('Error fetching treasury balance:', err);
      throw err;
    }
  }

  // Deposit funds into treasury
  async depositFunds(amount: string, depositor: `0x${string}`): Promise<any> {
    try {
      const txHash = await writeContract({
        client,
        address: treasuryContract.address,
        abi: treasuryContract.abi,
        functionName: 'deposit',
        args: [],
        value: parseEther(amount),
        account: depositor,
      });

      await waitForTransaction(client, { hash: txHash });
      return { success: true, txHash };
    } catch (err) {
      console.error('Error depositing funds:', err);
      throw err;
    }
  }

  // Withdraw funds from treasury
  async withdrawFunds(amount: string, recipient: `0x${string}`): Promise<any> {
    try {
      const txHash = await writeContract({
        client,
        address: treasuryContract.address,
        abi: treasuryContract.abi,
        functionName: 'withdraw',
        args: [parseEther(amount), recipient],
        account: recipient,
      });

      await waitForTransaction(client, { hash: txHash });
      return { success: true, txHash };
    } catch (err) {
      console.error('Error withdrawing funds:', err);
      throw err;
    }
  }
}
