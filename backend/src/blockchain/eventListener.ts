// backend/src/blockchain/eventListener.ts
import { createPublicClient, http, watchContractEvent, PublicClient, Address } from 'viem';
import { mainnet } from 'viem/chains';
import { investmentDAOAbi, governanceAbi, treasuryAbi } from './contracts';

// RPC URL from env or default
const rpcUrl = process.env.VITE_RPC_URL || 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY';

const publicClient: PublicClient = createPublicClient({
  chain: mainnet,
  transport: http(rpcUrl),
});

// Replace with your deployed contract addresses
const investmentDAOAddress: Address = '0xYourInvestmentDAOAddress';
const governanceAddress: Address = '0xYourGovernanceAddress';
const treasuryAddress: Address = '0xYourTreasuryAddress';

/**
 * Start all blockchain event listeners
 */
export function startListeners() {
  console.log('Starting blockchain event listeners...');

  watchEvent(publicClient, investmentDAOAddress, investmentDAOAbi, 'Deposit', (log) => {
    console.log('[InvestmentDAO] Deposit event:', log);
    // handle deposit event
  });

  watchEvent(publicClient, governanceAddress, governanceAbi, 'ProposalCreated', (log) => {
    console.log('[Governance] ProposalCreated event:', log);
    // handle governance event
  });

  watchEvent(publicClient, treasuryAddress, treasuryAbi, 'TreasuryFunded', (log) => {
    console.log('[Treasury] Funded event:', log);
    // handle treasury event
  });
}

/**
 * Helper to watch a contract event
 */
function watchEvent(
  client: PublicClient,
  address: Address,
  abi: typeof investmentDAOAbi,
  eventName: string,
  callback: (log: any) => void
) {
  watchContractEvent(client, {
    address,
    abi,
    eventName,
    onLogs: (logs) => {
      logs.forEach(callback);
    },
  });
}
