// src/blockchain/viemClient.ts
import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { sepolia } from 'viem/chains';

import { env } from '../config/env';

/**
 * Public client
 * - used for reads
 * - used for waiting on receipts
 */
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(env.RPC_URL),
});

/**
 * Wallet client
 * - used ONLY for sending transactions
 */
export const account = privateKeyToAccount(env.DEPLOYER_PRIVATE_KEY);

export const walletClient = createWalletClient({
  chain: sepolia,
  transport: http(env.RPC_URL),
  account,
});
