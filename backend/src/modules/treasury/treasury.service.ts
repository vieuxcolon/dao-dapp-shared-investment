// src/modules/treasury/treasury.service.ts
import { Injectable } from '@nestjs/common';
import { treasuryContract, walletClient } from '../../blockchain/contracts';
import { parseEther, formatEther } from 'viem';

@Injectable()
export class TreasuryService {
  async deposit(amount: string, depositor: `0x${string}`) {
    const value = parseEther(amount);

    const txHash: `0x${string}` = await treasuryContract.write.deposit({
      account: depositor,
      args: [],
      value,
    });

    await walletClient.waitForTransactionReceipt({ hash: txHash });

    return { success: true, txHash };
  }

  async withdraw(amount: string, recipient: `0x${string}`) {
    const value = parseEther(amount);

    const txHash: `0x${string}` = await treasuryContract.write.withdraw({
      account: recipient,
      args: [],
      value,
    });

    await walletClient.waitForTransactionReceipt({ hash: txHash });

    return { success: true, txHash };
  }

  async getBalance() {
    const balance: bigint = await treasuryContract.read.getBalance();
    return formatEther(balance);
  }
}
