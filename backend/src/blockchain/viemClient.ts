// backend/src/blockchain/viemClient.ts
import { createPublicClient, createWalletClient, http } from 'viem';
import { goerli } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

/**
 * Load private key from environment variables
 */
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/**
 * Public client: for read-only operations
 */
export const publicClient = createPublicClient({
  chain: goerli,
  transport: http(),
});

/**
 * Wallet client: for sending transactions
 * Only initialized if PRIVATE_KEY is defined
 */
export const walletClient = createWalletClient({
  chain: goerli,
  transport: http(),
  account: PRIVATE_KEY ? privateKeyToAccount(PRIVATE_KEY) : undefined,
});
