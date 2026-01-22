import { parseEther, formatEther } from 'viem';
import { client, treasuryContract } from '../../blockchain/contracts';

export class TreasuryService {
  // ─────────────────────────────────────────────
  // Get treasury balance
  // ─────────────────────────────────────────────
  async getBalance(): Promise<string> {
    const balance = await client.readContract({
      ...treasuryContract,
      functionName: 'getBalance',
    });

    return formatEther(balance as bigint);
  }

  // ─────────────────────────────────────────────
  // Deposit ETH
  // ─────────────────────────────────────────────
  async deposit(amount: string, signer: `0x${string}`) {
    const hash = await client.writeContract({
      ...treasuryContract,
      account: signer,
      functionName: 'deposit',
      value: parseEther(amount),
    });

    return await client.waitForTransactionReceipt({ hash });
  }

  // ─────────────────────────────────────────────
  // Withdraw ETH
  // ─────────────────────────────────────────────
  async withdraw(
    to: `0x${string}`,
    amount: string,
    signer: `0x${string}`,
  ) {
    const hash = await client.writeContract({
      ...treasuryContract,
      account: signer,
      functionName: 'withdraw',
      args: [to, parseEther(amount)],
    });

    return await client.waitForTransactionReceipt({ hash });
  }
}

