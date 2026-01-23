//backend/src/blockchain/eventListener.ts
import { decodeEventLog } from 'viem';
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
        const decoded = decodeEventLog({
          abi: governanceContract.abi,
          data: log.data,
          topics: log.topics,
        });

        console.log(' ProposalCreated:', decoded.args);
      }
    },
  });

  publicClient.watchContractEvent({
    ...governanceContract,
    eventName: 'VoteCast',
    onLogs(logs) {
      for (const log of logs) {
        const decoded = decodeEventLog({
          abi: governanceContract.abi,
          data: log.data,
          topics: log.topics,
        });

        console.log(' VoteCast:', decoded.args);
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
        const decoded = decodeEventLog({
          abi: treasuryContract.abi,
          data: log.data,
          topics: log.topics,
        });

        console.log(' Deposit:', decoded.args);
      }
    },
  });

  publicClient.watchContractEvent({
    ...treasuryContract,
    eventName: 'Withdraw',
    onLogs(logs) {
      for (const log of logs) {
        const decoded = decodeEventLog({
          abi: treasuryContract.abi,
          data: log.data,
          topics: log.topics,
        });

        console.log(' Withdraw:', decoded.args);
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
        const decoded = decodeEventLog({
          abi: investmentDAOContract.abi,
          data: log.data,
          topics: log.topics,
        });

        console.log(' InvestmentCreated:', decoded.args);
      }
    },
  });
}
