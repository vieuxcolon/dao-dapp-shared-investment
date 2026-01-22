// src/blockchain/eventListener.ts
import { createPublicClient, http } from 'viem';
import {
  investmentDAOAbi,
  governanceAbi,
  treasuryAbi,
  investmentDAOAddress,
  governanceAddress,
  treasuryAddress,
} from './contracts';

const publicClient = createPublicClient({
  transport: http(process.env.RPC_URL || 'https://rpc.ankr.com/eth'),
});

export function startListeners() {
  publicClient.watchContractEvent({
    address: investmentDAOAddress,
    abi: investmentDAOAbi,
    eventName: 'InvestmentCreated',
    onLogs: (logs) => {
      logs.forEach((log) => {
        console.log('InvestmentCreated:', log.args);
      });
    },
  });

  publicClient.watchContractEvent({
    address: governanceAddress,
    abi: governanceAbi,
    eventName: 'ProposalCreated',
    onLogs: (logs) => {
      logs.forEach((log) => {
        console.log('ProposalCreated:', log.args);
      });
    },
  });

  publicClient.watchContractEvent({
    address: treasuryAddress,
    abi: treasuryAbi,
    eventName: 'FundsDeposited',
    onLogs: (logs) => {
      logs.forEach((log) => {
        console.log('FundsDeposited:', log.args);
      });
    },
  });

  console.log('Blockchain event listeners started');
}
