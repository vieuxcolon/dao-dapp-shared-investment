import { createPublicClient, http, watchContractEvent, parseAbiItem } from 'viem';
import { ethers } from 'ethers';
import { investmentDAOAbi, governanceAbi, treasuryAbi } from './contracts';

// Initialize a public client to connect to Ethereum (or your chain)
const client = createPublicClient({
  transport: http(process.env.RPC_URL || 'https://rpc.ankr.com/eth')
});

// Example function to start listening to events
export function startListeners() {
  // Listen to InvestmentDAO events
  watchContractEvent(client, {
    address: process.env.INVESTMENT_DAO_ADDRESS as `0x${string}`,
    abi: investmentDAOAbi,
    eventName: 'InvestmentCreated', // Replace with your event name
    listener: (log) => {
      console.log('InvestmentCreated event:', log);
    }
  });

  // Listen to Governance events
  watchContractEvent(client, {
    address: process.env.GOVERNANCE_ADDRESS as `0x${string}`,
    abi: governanceAbi,
    eventName: 'ProposalCreated',
    listener: (log) => {
      console.log('ProposalCreated event:', log);
    }
  });

  // Listen to Treasury events
  watchContractEvent(client, {
    address: process.env.TREASURY_ADDRESS as `0x${string}`,
    abi: treasuryAbi,
    eventName: 'FundsDeposited',
    listener: (log) => {
      console.log('FundsDeposited event:', log);
    }
  });

  console.log('Event listeners started');
}
