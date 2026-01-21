// backend/src/blockchain/eventListener.ts
import { watchEvent, EventLog } from 'viem';
import { client } from './contracts';
import { daoContract } from './contracts';

/**
 * Start all blockchain event listeners.
 */
export function startListeners() {
  console.log('Starting blockchain event listeners...');

  // Example: listening to "ProposalCreated" event
  watchEvent(client, daoContract, 'ProposalCreated', (event: EventLog) => {
    console.log('ProposalCreated event:', event);
    // TODO: handle the event, e.g., save to database
  });

  // Example: listening to "VoteCast" event
  watchEvent(client, daoContract, 'VoteCast', (event: EventLog) => {
    console.log('VoteCast event:', event);
    // TODO: handle the event
  });

  // Example: listening to "FundsDeposited" event
  watchEvent(client, daoContract, 'FundsDeposited', (event: EventLog) => {
    console.log('FundsDeposited event:', event);
    // TODO: handle the event
  });

  console.log('Blockchain listeners started successfully.');
}
