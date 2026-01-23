// src/blockchain/eventListener.ts
import { publicClient } from './viemClient';
import {
  governanceContract,
  investmentDAOContract,
  treasuryContract,
} from './contracts';

/**
 * Starts all blockchain event listeners
 * Call once during app bootstrap
 */
export function startBlockchainEventListeners() {
  watchGovernanceEvents();
  watchTreasuryEvents();
  watchInvestmentDAOEvents();
}

/* ─────────────────────────────────────────────
 * Governance Events
 * ───────────────────────────────────────────── */
function watchGovernanceEvents() {
  publicClient.watchContractEvent({
    ...governanceContract,
    eventName: 'ProposalCreated',
    onLogs(logs) {
      for (const log of logs) {
        console.log(' ProposalCreated:', log.args);
        // TODO: persist to DB / trigger off-chain logic
      }
    },
  });

  publicClient.watchContractEvent({
    ...governanceContract,
    eventName: 'VoteCast',
    onLogs(logs) {
      for (const log of logs) {
        console.log(' VoteCast:', log.args);
      }
    },
  });
}

/* ─────────────────────────────────────────────
 * Treasury Events
 * ───────────────────────────────────────────── */
function watchTreasuryEvents() {
  publicClient.watchContractEvent({
    ...treasuryContract,
    eventName: 'Deposit',
    onLogs(logs) {
      for (const log of logs) {
        console.log(' Deposit:', log.args);
      }
    },
  });

  publicClient.watchContractEvent({
    ...treasuryContract,
    eventName: 'Withdraw',
    onLogs(logs) {
      for (const log of logs) {
        console.log(' Withdraw:', log.args);
      }
    },
  });
}

/* ─────────────────────────────────────────────
 * Investment DAO Events
 * ───────────────────────────────────────────── */
function watchInvestmentDAOEvents() {
  publicClient.watchContractEvent({
    ...investmentDAOContract,
    eventName: 'InvestmentCreated',
    onLogs(logs) {
      for (const log of logs) {
        console.log(' InvestmentCreated:', log.args);
      }
    },
  });
}
