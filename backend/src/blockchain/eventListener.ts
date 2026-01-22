// backend/src/blockchain/eventListener.ts
import { client } from './contracts';
import {
  investmentDAOContract,
  governanceContract,
  treasuryContract,
} from './contracts';

export async function startListeners() {
  console.log('Starting blockchain event listeners...');

  // Example: listen to ProposalCreated event
  const proposalLogs = await client.getLogs({
    address: investmentDAOContract.address,
    event: investmentDAOContract.events.ProposalCreated, // ABI event object
    fromBlock: 0n,
  });

  proposalLogs.forEach((log) => {
    console.log('ProposalCreated event:', log);
  });

  // Example: listen to VoteCast event
  const voteLogs = await client.getLogs({
    address: governanceContract.address,
    event: governanceContract.events.VoteCast, // ABI event object
    fromBlock: 0n,
  });

  voteLogs.forEach((log) => {
    console.log('VoteCast event:', log);
  });

  // Example: listen to Deposit event
  const depositLogs = await client.getLogs({
    address: treasuryContract.address,
    event: treasuryContract.events.Deposit, // ABI event object
    fromBlock: 0n,
  });

  depositLogs.forEach((log) => {
    console.log('Deposit event:', log);
  });
}
