// src/blockchain/viemClient.ts
import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { sepolia } from 'viem/chains';
import { env } from '../config/env';

/* ─────────────────────────────────────────────
 * Chain
 * ───────────────────────────────────────────── */
export const chain = sepolia;

/* ─────────────────────────────────────────────
 * Public client (READS, EVENTS, RECEIPTS)
 * ───────────────────────────────────────────── */
export const publicClient = createPublicClient({
  chain,
  transport: http(env.RPC_URL),
});

/* ─────────────────────────────────────────────
 * Wallet client (WRITES ONLY)
 * ───────────────────────────────────────────── */
const account = privateKeyToAccount(env.PRIVATE_KEY as `0x${string}`);

export const walletClient = createWalletClient({
  chain,
  transport: http(env.RPC_URL),
  account,
});

/* ─────────────────────────────────────────────
 * Helpers
 * ───────────────────────────────────────────── */

/**
 * Waits for a transaction to be mined
 * (walletClient does NOT do this in Viem 2.x)
 */
export async function waitForTx(hash: `0x${string}`) {
  return publicClient.waitForTransactionReceipt({ hash });
}
