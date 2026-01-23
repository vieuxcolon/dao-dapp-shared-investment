// src/blockchain/viemClient.ts
import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { mainnet } from 'viem/chains';
import { PrivateKeyAccount } from 'viem/accounts';

// ──────────────────────────────
// Public client (read-only)
// ──────────────────────────────
export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(process.env.RPC_URL!),
});

// ──────────────────────────────
// Wallet client (signing transactions)
// ──────────────────────────────
export const walletClient = createWalletClient({
  chain: mainnet,
  transport: http(process.env.RPC_URL!),
  account:
    process.env.PRIVATE_KEY
      ? new PrivateKeyAccount(process.env.PRIVATE_KEY)
      : undefined,
});

