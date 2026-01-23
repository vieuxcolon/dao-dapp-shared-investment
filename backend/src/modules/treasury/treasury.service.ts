import { treasuryContract } from '../../blockchain/contracts';
import { parseEther, formatEther } from 'viem';

export class TreasuryService {
  async depositFunds(amount: string, from: `0x${string}`) {
    const txHash: `0x${string}` = await treasuryContract.write.deposit({
      args: [parseEther(amount)], // viem requires bigint
      account: from,
    });
    return txHash;
  }

  async withdrawFunds(amount: string, to: `0x${string}`) {
    const txHash: `0x${string}` = await treasuryContract.write.withdraw({
      args: [parseEther(amount)],
      account: to,
    });
    return txHash;
  }

  async getBalance() {
    const balance: bigint = await treasuryContract.read.getBalance();
    return formatEther(balance); // convert bigint to string
  }
}
