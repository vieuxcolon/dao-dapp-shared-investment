import { Injectable } from '@nestjs/common';
import { walletClient, publicClient } from '../../blockchain/viemClient';
import { treasuryContract } from '../../blockchain/contracts';

@Injectable()
export class TreasuryService {
  async deposit(
    signer: `0x${string}`,
    amount: bigint
  ): Promise<{ success: boolean; txHash: `0x${string}` }> {
    const txHash: `0x${string}` = await walletClient.writeContract({
      address: treasuryContract.address,
      abi: treasuryContract.abi,
      functionName: 'deposit',
      args: [amount],
      account: signer,
    });

    // ✅ Fix TS error
    await publicClient.waitForTransactionReceipt({ hash: txHash });

    return { success: true, txHash };
  }

  async withdraw(
    signer: `0x${string}`,
    amount: bigint
  ): Promise<{ success: boolean; txHash: `0x${string}` }> {
    const txHash: `0x${string}` = await walletClient.writeContract({
      address: treasuryContract.address,
      abi: treasuryContract.abi,
      functionName: 'withdraw',
      args: [amount],
      account: signer,
    });

    await publicClient.waitForTransactionReceipt({ hash: txHash });

    return { success: true, txHash };
  }

  async getBalance(): Promise<bigint> {
    const balance = await publicClient.readContract({
      address: treasuryContract.address,
      abi: treasuryContract.abi,
      functionName: 'getBalance',
    });

    return balance as bigint; // ✅ Fix TS unknown type
  }
}
