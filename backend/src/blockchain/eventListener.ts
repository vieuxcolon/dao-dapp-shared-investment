import { publicClient } from "./client";
import InvestmentDAO from "../../../contracts/artifacts/contracts/InvestmentDAO.sol/InvestmentDAO.json";

/* --------------------------------------------------
   Addresses
-------------------------------------------------- */

const DAO_ADDRESS = process.env.DAO_ADDRESS as `0x${string}`;

if (!DAO_ADDRESS) {
  throw new Error("DAO_ADDRESS is not defined");
}

/* --------------------------------------------------
   Event listeners
-------------------------------------------------- */

export function startDAOEventListeners() {
  const unwatchProposalCreated =
    publicClient.watchContractEvent({
      address: DAO_ADDRESS,
      abi: InvestmentDAO.abi,
      eventName: "ProposalCreated",
      onLogs(logs) {
        for (const log of logs) {
          console.log("📜 ProposalCreated:", log.args);
        }
      },
    });

  const unwatchVoteCast =
    publicClient.watchContractEvent({
      address: DAO_ADDRESS,
      abi: InvestmentDAO.abi,
      eventName: "VoteCast",
      onLogs(logs) {
        for (const log of logs) {
          console.log("🗳️ VoteCast:", log.args);
        }
      },
    });

  const unwatchExecuted =
    publicClient.watchContractEvent({
      address: DAO_ADDRESS,
      abi: InvestmentDAO.abi,
      eventName: "ProposalExecuted",
      onLogs(logs) {
        for (const log of logs) {
          console.log("✅ ProposalExecuted:", log.args);
        }
      },
    });

  console.log("🚀 DAO event listeners started");

  /* --------------------------------------------------
     Graceful shutdown support
  -------------------------------------------------- */

  return () => {
    unwatchProposalCreated();
    unwatchVoteCast();
    unwatchExecuted();
    console.log("🛑 DAO event listeners stopped");
  };
}
