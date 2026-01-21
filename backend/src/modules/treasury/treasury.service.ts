import { ethers } from 'ethers';
import { getDAOContract } from '../../blockchain/contracts';

export class TreasuryService {
  private contract;

  constructor() {
    this.contract = getDAOContract();
  }

  // Get current treasury balance
  async getBalance(): Promise<string> {
    try {
      const balance = await this.contract.getTreasuryBalance();
      return ethers.utils.formatEther(balance);
    } catch (err) {
      console.error('Error fetching treasury balance:', err);
      throw err;
    }
  }

  // Deposit funds into treasury
  async depositFunds(amount: string, depositor: string): Promise<any> {
    try {
      const tx = await this.contract.deposit({
        from: depositor,
        value: ethers.utils.parseEther(amount),
      });
      await tx.wait();
      return { success: true, txHash: tx.hash };
    } catch (err) {
      console.error('Error depositing funds:', err);
      throw err;
    }
  }

  // Withdraw funds from treasury
  async withdrawFunds(amount: string, recipient: string): Promise<any> {
    try {
      const tx = await this.contract.withdraw(
        ethers.utils.parseEther(amount),
        recipient
      );
      await tx.wait();
      return { success: true, txHash: tx.hash };
    } catch (err) {
      console.error('Error withdrawing funds:', err);
      throw err;
    }
  }
}
