// backend/src/blockchain/eventListener.ts
import { Log, readContract } from 'viem';
import {
  investmentDAOContract,
  governanceContract,
  treasuryContract,
  client,
} from './contracts';

/**
 * Start listening to blockchain events for all contracts
 */
export function startListeners() {
  console.log('Blockchain event listeners started');

  // Example: Listen to InvestmentDAO events
  listenToInvestmentDAOEvents();

  // Example: Listen to Governance events
  listenToGovernanceEvents();

  // Example: Listen to Treasury events
  listenToTreasuryEvents();
}

/** -------------------- InvestmentDAO -------------------- */
async function listenToInvestmentDAOEvents() {
  try {
    // Fetch past logs (example: all "ProposalCreated" events)
    const logs: Log[] = await client.getLogs({
      address: investmentDAOContract.address,
      abi: investmentDAOContract.abi,
      event: 'ProposalCreated', // replace with actual event name
      fromBlock: 0n,
    });

    logs.forEach((log: Log) => {
      console.log('[InvestmentDAO] ProposalCreated event:', log);
      // Access args if ABI is fully typed
      // const { proposer, proposalId } = log.args;
    });
  } catch (err) {
    console.error('Error fetching InvestmentDAO logs:', err);
  }
}

/** -------------------- Governance -------------------- */
async function listenToGovernanceEvents() {
  try {
    const logs: Log[] = await client.getLogs({
      address: governanceContract.address,
      abi: governanceContract.abi,
      event: 'VoteCast', // replace with actual event name
      fromBlock: 0n,
    });

    logs.forEach((log: Log) => {
      console.log('[Governance] VoteCast event:', log);
      // const { voter, proposalId, support } = log.args;
    });
  } catch (err) {
    console.error('Error fetching Governance logs:', err);
  }
}

/** -------------------- Treasury -------------------- */
async function listenToTreasuryEvents() {
  try {
    const logs: Log[] = await client.getLogs({
      address: treasuryContract.address,
      abi: treasuryContract.abi,
      event: 'Deposit', // replace with actual event name
      fromBlock: 0n,
    });

    logs.forEach((log: Log) => {
      console.log('[Treasury] Deposit event:', log);
      // const { depositor, amount } = log.args;
    });
  } catch (err) {
    console.error('Error fetching Treasury logs:', err);
  }
}
