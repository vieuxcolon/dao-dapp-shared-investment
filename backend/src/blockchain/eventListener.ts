import { publicClient } from './client'
import {
  investmentDAOAbi,
  governanceAbi,
  treasuryAbi,
  investmentDAOAddress,
  governanceAddress,
  treasuryAddress,
} from './contracts'
import type { Log } from 'viem'

export function startEventListeners() {
  publicClient.watchContractEvent({
    address: investmentDAOAddress,
    abi: investmentDAOAbi,
    eventName: 'InvestmentCreated',
    onLogs: (logs: Log[]) => {
      logs.forEach((log) => {
        console.log('InvestmentCreated:', log.args)
      })
    },
  })

  publicClient.watchContractEvent({
    address: governanceAddress,
    abi: governanceAbi,
    eventName: 'ProposalCreated',
    onLogs: (logs: Log[]) => {
      logs.forEach((log) => {
        console.log('ProposalCreated:', log.args)
      })
    },
  })

  publicClient.watchContractEvent({
    address: treasuryAddress,
    abi: treasuryAbi,
    eventName: 'FundsReleased',
    onLogs: (logs: Log[]) => {
      logs.forEach((log) => {
        console.log('FundsReleased:', log.args)
      })
    },
  })
}
