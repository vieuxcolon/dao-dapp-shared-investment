// backend/src/blockchain/eventListener.ts
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { investmentDAOAbi, governanceAbi, treasuryAbi } from './contracts';
import { Address } from 'viem';

const rpcUrl = process.env.VITE_RPC_URL || 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY';
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(rpcUrl),
});

// Replace these with your actual contract addresses
const investmentDAOAddress: Address = '0xYourInvestmentDAOAddress';
const governanceAddress: Address = '0xYourGovernanceAddress';
const treasuryAddress: Address = '0xYourTreasuryAddress';

export function startListeners() {
  console.log('Starting blockchain event listeners...');

  watchEvent(publicClient, {
    address: investmentDAOAddress,
    abi: investmentDAOAbi,
    eventName: 'Deposit', // example event
  }, (log) => {
    console.log('InvestmentDAO Deposit event:', log);
    // handle deposit event
  });

  watchEvent(publicClient, {
    address: governanceAddress,
    abi: governanceAbi,
    eventName: 'ProposalCreated', // example event
  }, (log) => {
    console.log('Governance ProposalCreated event:', log);
    // handle governance event
  });

  watchEvent(publicClient, {
    address: treasuryAddress,
    abi: treasuryAbi,
    eventName: 'TreasuryFunded', // example event
  }, (log) => {
    console.log('Treasury Funded event:', log);
    // handle treasury event
  });
}

// Helper function to watch any contract event
function watchEvent(client: typeof publicClient, options: any, callback: (log: any) => void) {
  client.watchContractEvent(options, callback);
}
