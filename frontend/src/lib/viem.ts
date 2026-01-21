import { createPublicClient, createWalletClient, http, custom } from "viem";
import { mainnet } from "viem/chains";

// Public Ethereum client
export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

// Wallet client using injected provider (e.g., MetaMask)
export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});
