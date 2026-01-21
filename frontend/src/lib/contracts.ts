import { publicClient, walletClient } from "./viem";
import InvestmentDAOABI from "../contracts/InvestmentDAO.json";
import GovernanceABI from "../contracts/Governance.json";
import TreasuryABI from "../contracts/Treasury.json";

const DAO_ADDRESS = import.meta.env.VITE_DAO_ADDRESS as `0x${string}`;
const GOVERNANCE_ADDRESS = import.meta.env.VITE_GOVERNANCE_ADDRESS as `0x${string}`;
const TREASURY_ADDRESS = import.meta.env.VITE_TREASURY_ADDRESS as `0x${string}`;

export const daoContract = {
  address: DAO_ADDRESS,
  abi: InvestmentDAOABI,
  client: walletClient,
};

export const governanceContract = {
  address: GOVERNANCE_ADDRESS,
  abi: GovernanceABI,
  client: walletClient,
};

export const treasuryContract = {
  address: TREASURY_ADDRESS,
  abi: TreasuryABI,
  client: walletClient,
};

export const readContracts = {
  dao: { address: DAO_ADDRESS, abi: InvestmentDAOABI, client: publicClient },
  governance: { address: GOVERNANCE_ADDRESS, abi: GovernanceABI, client: publicClient },
  treasury: { address: TREASURY_ADDRESS, abi: TreasuryABI, client: publicClient },
};
