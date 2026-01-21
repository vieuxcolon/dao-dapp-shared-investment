import { createPublicClient, http } from 'viem';
import { mainnet, goerli } from 'viem/chains';

// Create a reusable Viem client for interacting with Ethereum
const RPC_URL = process.env.ETH_RPC_URL || 'http://localhost:8545';

export const viemClient = createPublicClient({
  chain: goerli, // change to mainnet if needed
  transport: http(RPC_URL),
});

console.log(`✅ Viem client initialized for chain: ${viemClient.chain.name}`);
