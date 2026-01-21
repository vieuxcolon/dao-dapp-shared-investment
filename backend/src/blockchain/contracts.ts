import { getContract } from "viem";
import InvestmentDAO from "../../../contracts/artifacts/contracts/InvestmentDAO.sol/InvestmentDAO.json";
import Governance from "../../../contracts/artifacts/contracts/Governance.sol/Governance.json";
import Treasury from "../../../contracts/artifacts/contracts/Treasury.sol/Treasury.json";
import { publicClient } from "./client";

/* --------------------------------------------------
   Contract addresses (env-driven)
-------------------------------------------------- */

const DAO_ADDRESS = process.env.DAO_ADDRESS as `0x${string}`;
const GOVERNANCE_ADDRESS = process.env.GOVERNANCE_ADDRESS as `0x${string}`;
const TREASURY_ADDRESS = process.env.TREASURY_ADDRESS as `0x${string}`;

if (!DAO_ADDRESS || !GOVERNANCE_ADDRESS || !TREASURY_ADDRESS) {
  throw new Error("Missing contract address environment variables");
}

/* --------------------------------------------------
   Contracts
-------------------------------------------------- */

export const daoContract = getContract({
  address: DAO_ADDRESS,
  abi: InvestmentDAO.abi,
  client: publicClient,
});

export const governanceContract = getContract({
  address: GOVERNANCE_ADDRESS,
  abi: Governance.abi,
  client: publicClient,
});

export const treasuryContract = getContract({
  address: TREASURY_ADDRESS,
  abi: Treasury.abi,
  client: publicClient,
});

/* --------------------------------------------------
   Optional helper exports
-------------------------------------------------- */

export type DAOContract = typeof daoContract;
export type GovernanceContract = typeof governanceContract;
export type TreasuryContract = typeof treasuryContract;

