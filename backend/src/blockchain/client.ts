import { createPublicClient, http } from "viem";
import { mainnet, sepolia } from "viem/chains";

const chain = process.env.CHAIN_ID === "1" ? mainnet : sepolia;

export const publicClient = createPublicClient({
  chain,
  transport: http(process.env.RPC_URL),
});
