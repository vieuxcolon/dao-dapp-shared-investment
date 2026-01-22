// backend/src/modules/treasury/treasury.service.ts
import { parseEther, formatEther } from 'viem';
import {
  client,
  walletClient,
  treasuryContract,
} from '../../blockchain/contracts';

export class TreasuryService {
  // ─────────────────────────────────────────────
  // Get treasury balance (read-only)
  // ─────────────────────────────────────────────
  async getBalance(): Promise<string> {
    const balance = await treasuryContract.read.getBalance();
    return formatEther(balance);
  }

  // ─────────────────────────────────────────────
  // Deposit ETH (on-chain tx)
  // ─────────────────────────────────────────────
  async deposit(amount: string, signer: `0x${string}`) {
    const hash = await walletClient.writeContract({
      address: treasuryContract.address,
      abi: treasuryContract.abi,
      functionName: 'deposit',
      account: signer,
      value: parseEther(amount),
    });

    const receipt = await client.waitForTransactionReceipt({ hash });

    return {
      success: true,
      txHash: receipt.transactionHash,
    };
  }

  // ─────────────────────────────────────────────
  // Withdraw ETH (on-chain tx)
  // ─────────────────────────────────────────────
  async withdraw(
    to: `0x${string}`,
    amount: string,
    signer: `0x${string}`,
  ) {
    const hash = await walletClient.writeContract({
      address: treasuryContract.address,
      abi: treasuryContract.abi,
      functionName: 'withdraw',
      args: [to, parseEther(amount)],
      account: signer,
    });

    const receipt = await client.waitForTransactionReceipt({ hash });

    return {
      success: true,
      txHash: receipt.transactionHash,
    };
  }
}
