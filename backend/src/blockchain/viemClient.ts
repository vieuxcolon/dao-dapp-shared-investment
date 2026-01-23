// backend/src/blockchain/viemClient.ts
import { createPublicClient, createWalletClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

const PRIVATE_KEY = process.env.PRIVATE_KEY;

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: http(),
  account: PRIVATE_KEY ? privateKeyToAccount(PRIVATE_KEY as `0x${string}`) : undefined,
});
