// backend/src/modules/treasury/treasury.service.ts
import { readContract, writeContract } from 'viem';
import { treasuryContract } from '../../blockchain/contracts';
import { parseEther, formatEther } from 'ethers/lib/utils';

export class TreasuryService {
  // Read current treasury balance
  async getBalance(): Promise<string> {
    try {
      const balance = await readContract({
        ...treasuryContract,
        functionName: 'getTreasuryBalance',
      });
      return formatEther(balance as bigint); // convert wei to ETH
    } catch (err) {
      console.error('Error fetching treasury balance:', err);
      throw err;
    }
  }

  // Deposit funds into the treasury
  async depositFunds(amountEth: string, fromAddress: `0x${string}`): Promise<string> {
    try {
      const tx = await writeContract({
        ...treasuryContract,
        functionName: 'deposit',
        args: [],
        account: fromAddress,
        value: parseEther(amountEth),
      });
      return `Transaction submitted: ${tx.hash}`;
    } catch (err) {
      console.error('Error depositing funds:', err);
      throw err;
    }
  }
}
