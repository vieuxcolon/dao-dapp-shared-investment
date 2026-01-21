import { daoContract, governanceContract, treasuryContract } from './contracts';
import { watchEvent } from 'viem';

export function listenToEvents() {
  console.log('🟢 Starting event listeners for DAO, Governance, and Treasury contracts...');

  // Example: listen for new proposals in Governance contract
  watchEvent(governanceContract, 'ProposalCreated', (event) => {
    console.log('📄 New Proposal Created:', event);
  });

  // Example: listen for votes in Governance contract
  watchEvent(governanceContract, 'VoteCast', (event) => {
    console.log('🗳 Vote Cast Event:', event);
  });

  // Example: listen for deposits in Treasury contract
  watchEvent(treasuryContract, 'Deposit', (event) => {
    console.log('💰 Treasury Deposit:', event);
  });

  // Example: listen for withdrawals in Treasury contract
  watchEvent(treasuryContract, 'Withdrawal', (event) => {
    console.log('💸 Treasury Withdrawal:', event);
  });

  // Example: listen for DAO specific events
  watchEvent(daoContract, 'MemberJoined', (event) => {
    console.log('👤 New DAO Member:', event);
  });

  watchEvent(daoContract, 'MemberLeft', (event) => {
    console.log('🚪 DAO Member Left:', event);
  });

  console.log('✅ Event listeners successfully registered.');
}

// Automatically start listeners when this module is imported
listenToEvents();
