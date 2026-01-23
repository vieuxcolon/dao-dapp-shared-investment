// src/modules/treasury/treasury.service.ts
import { Injectable } from '@nestjs/common';
import { walletClient, publicClient } from '../../blockchain/viemClient';
import { treasuryContract } from '../../blockchain/contracts';

@Injectable()
export class TreasuryService {
  /* ─────────────────────────────
   * Deposit funds (WRITE)
   * ───────────────────────────── */
  async deposit(signer: `0x${string}`, amount: bigint): Promise<{ success: boolean; txHash: `0x${string}` }> {
    const txHash: `0x${string}` = await walletClient.writeContract({
      address: treasuryContract.address,
      abi: treasuryContract.abi,
      functionName: 'deposit',
      args: [amount],
      account: signer,
    });

    await walletClient.waitForTransactionReceipt({ hash: txHash });
    return { success: true, txHash };
  }

  /* ─────────────────────────────
   * Withdraw funds (WRITE)
   * ───────────────────────────── */
  async withdraw(signer: `0x${string}`, amount: bigint): Promise<{ success: boolean; txHash: `0x${string}` }> {
    const txHash: `0x${string}` = await walletClient.writeContract({
      address: treasuryContract.address,
      abi: treasuryContract.abi,
      functionName: 'withdraw',
      args: [amount],
      account: signer,
    });

    await walletClient.waitForTransactionReceipt({ hash: txHash });
    return { success: true, txHash };
  }

  /* ─────────────────────────────
   * Get treasury balance (READ)
   * ───────────────────────────── */
  async getBalance(): Promise<bigint> {
    return publicClient.readContract({
      address: treasuryContract.address,
      abi: treasuryContract.abi,
      functionName: 'getBalance',
      args: [],
    });
  }
}
