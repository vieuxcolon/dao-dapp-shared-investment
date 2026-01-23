//backend/src/modules/treasury/treasury.service.ts
import { Injectable } from '@nestjs/common';
import { walletClient, publicClient } from '../../blockchain/viemClient';
import { treasuryContract } from '../../blockchain/contracts';

@Injectable()
export class TreasuryService {
  /* ─────────────────────────────
   * Deposit funds (WRITE)
   * ───────────────────────────── */
  async deposit(
    signer: `0x${string}`,
    amount: bigint
  ): Promise<{ success: boolean; txHash: `0x${string}` }> {
    const txHash: `0x${string}` = await walletClient.writeContract({
      ...treasuryContract,
      functionName: 'deposit',
      args: [amount],
      account: signer,
    });

    // walletClient may not have waitForTransactionReceipt in latest viem
    await publicClient.waitForTransactionReceipt({ hash: txHash });

    return { success: true, txHash };
  }

  /* ─────────────────────────────
   * Withdraw funds (WRITE)
   * ───────────────────────────── */
  async withdraw(
    signer: `0x${string}`,
    amount: bigint
  ): Promise<{ success: boolean; txHash: `0x${string}` }> {
    const txHash: `0x${string}` = await walletClient.writeContract({
      ...treasuryContract,
      functionName: 'withdraw',
      args: [amount],
      account: signer,
    });

    await publicClient.waitForTransactionReceipt({ hash: txHash });

    return { success: true, txHash };
  }

  /* ─────────────────────────────
   * Get treasury balance (READ)
   * ───────────────────────────── */
  async getBalance(): Promise<bigint> {
    const balance = await publicClient.readContract({
      ...treasuryContract,
      functionName: 'getBalance',
    });

    // cast to bigint to satisfy TS
    return balance as bigint;
  }
}
