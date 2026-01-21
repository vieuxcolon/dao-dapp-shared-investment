import { viemClient } from './viemClient';
import { parseAbi, createContract } from 'viem';
import InvestmentDAOJson from '../../../contracts/artifacts/contracts/InvestmentDAO.sol/InvestmentDAO.json';
import GovernanceJson from '../../../contracts/artifacts/contracts/Governance.sol/Governance.json';
import TreasuryJson from '../../../contracts/artifacts/contracts/Treasury.sol/Treasury.json';

const DAO_ABI = parseAbi(InvestmentDAOJson.abi);
const GOVERNANCE_ABI = parseAbi(GovernanceJson.abi);
const TREASURY_ABI = parseAbi(TreasuryJson.abi);

const DAO_ADDRESS = process.env.DAO_CONTRACT_ADDRESS || '';
const GOVERNANCE_ADDRESS = process.env.GOVERNANCE_CONTRACT_ADDRESS || '';
const TREASURY_ADDRESS = process.env.TREASURY_CONTRACT_ADDRESS || '';

export const daoContract = createContract({
  address: DAO_ADDRESS,
  abi: DAO_ABI,
  publicClient: viemClient,
});

export const governanceContract = createContract({
  address: GOVERNANCE_ADDRESS,
  abi: GOVERNANCE_ABI,
  publicClient: viemClient,
});

export const treasuryContract = createContract({
  address: TREASURY_ADDRESS,
  abi: TREASURY_ABI,
  publicClient: viemClient,
});

console.log('✅ Contract instances initialized for DAO, Governance, and Treasury');
