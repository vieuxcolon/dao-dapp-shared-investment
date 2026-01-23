// backend/src/blockchain/contracts.ts
import { Abi, createContract } from 'viem'
import { walletClient, publicClient } from './viemClient'

// === Contract ABIs (replace with actual ABIs) ===
import daoAbi from '../abis/DAO.json'
import governanceAbi from '../abis/Governance.json'
import treasuryAbi from '../abis/Treasury.json'
import votesAbi from '../abis/Votes.json'

// === Contract Addresses (replace with actual addresses) ===
const DAO_ADDRESS = '0xDAO_CONTRACT_ADDRESS'
const GOVERNANCE_ADDRESS = '0xGOVERNANCE_CONTRACT_ADDRESS'
const TREASURY_ADDRESS = '0xTREASURY_CONTRACT_ADDRESS'
const VOTES_ADDRESS = '0xVOTES_CONTRACT_ADDRESS'

// === Type helpers ===
interface ContractConfig {
  address: `0x${string}`
  abi: Abi
}

// === Contracts ===
export const investmentDAOContract: ContractConfig & { read: any; write: any } = createContract({
  address: DAO_ADDRESS,
  abi: daoAbi,
  publicClient,
  walletClient,
})

export const governanceContract: ContractConfig & { read: any; write: any } = createContract({
  address: GOVERNANCE_ADDRESS,
  abi: governanceAbi,
  publicClient,
  walletClient,
})

export const treasuryContract: ContractConfig & { read: any; write: any } = createContract({
  address: TREASURY_ADDRESS,
  abi: treasuryAbi,
  publicClient,
  walletClient,
})

export const votesContract: ContractConfig & { read: any; write: any } = createContract({
  address: VOTES_ADDRESS,
  abi: votesAbi,
  publicClient,
  walletClient,
})
