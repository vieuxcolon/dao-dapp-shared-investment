import { useState } from "react";
import { getProposalsContract } from "../lib/contracts";
import { ethers } from "ethers";

export const useVote = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const vote = async (proposalId: number, support: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const contract = await getProposalsContract();
      const tx = await contract.vote(proposalId, support);
      await tx.wait();
      return true;
    } catch (err: any) {
      console.error("Voting error:", err);
      setError(err.message || "Transaction failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { vote, loading, error };
};
