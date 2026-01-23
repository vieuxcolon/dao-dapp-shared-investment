// src/modules/treasury/treasury.service.ts
import { Injectable } from '@nestjs/common';
import { parseEther, formatEther } from 'viem';
import { treasuryContract, walletClient } from '../../blockchain/contracts';

@Injectable()
export class TreasuryService {
  constructor() {}

  // ────────────── DEPOSIT FUNDS ──────────────
  async depositFunds(amount: string, fromAddress: `0x${string}`) {
    // Write transaction
    const txHash = await treasuryContract.write.deposit({
      account: fromAddress,
      args: [parseEther(amount)],
    });

    // Wait for confirmation
    await walletClient.waitForTransactionReceipt({ hash: txHash });
    return txHash;
  }

  // ────────────── WITHDRAW FUNDS ──────────────
  async withdrawFunds(amount: string, recipient: `0x${string}`) {
    const txHash = await treasuryContract.write.withdraw({
      account: recipient,
      args: [parseEther(amount)],
    });

    await walletClient.waitForTransactionReceipt({ hash: txHash });
    return txHash;
  }

  // ────────────── GET BALANCE ──────────────
  async getBalance(): Promise<string> {
    const balance = await treasuryContract.read.getBalance();
    return formatEther(balance as bigint);
  }
}
