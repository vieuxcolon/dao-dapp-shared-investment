// backend/src/modules/treasury/treasury.service.ts
import { readContract, writeContract, parseEther, formatEther } from 'viem';
import { treasuryContract, client } from '../../blockchain/contracts';

export class TreasuryService {
  private contract = treasuryContract;

  // Get current treasury balance
  async getBalance(): Promise<string> {
    try {
      const balance = await readContract(client, {
        address: this.contract.address,
        abi: this.contract.abi,
        functionName: 'getTreasuryBalance',
      });

      // Convert BigInt to ETH string
      return formatEther(balance as bigint);
    } catch (err) {
      console.error('Error fetching treasury balance:', err);
      throw err;
    }
  }

  // Deposit funds into treasury
  async depositFunds(amount: string, fromAddress: `0x${string}`): Promise<any> {
    try {
      const tx = await writeContract(client, {
        address: this.contract.address,
        abi: this.contract.abi,
        functionName: 'deposit',
        args: [],
        value: parseEther(amount),
        account: fromAddress,
      });

      return { success: true, txHash: tx };
    } catch (err) {
      console.error('Error depositing funds:', err);
      throw err;
    }
  }

  // Withdraw funds from treasury
  async withdrawFunds(amount: string, recipient: `0x${string}`): Promise<any> {
    try {
      const tx = await writeContract(client, {
        address: this.contract.address,
        abi: this.contract.abi,
        functionName: 'withdraw',
        args: [parseEther(amount), recipient],
        account: recipient, // signer must be correct
      });

      return { success: true, txHash: tx };
    } catch (err) {
      console.error('Error withdrawing funds:', err);
      throw err;
    }
  }
}

