import { useState, useEffect } from "react";
import { getProposalsContract } from "../lib/contracts";
import { ethers } from "ethers";

export interface Proposal {
  id: number;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  executed: boolean;
}

export const useProposals = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProposals = async () => {
    try {
      const contract = await getProposalsContract();
      const count = (await contract.proposalCount()).toNumber();
      const result: Proposal[] = [];

      for (let i = 0; i < count; i++) {
        const p = await contract.proposals(i);
        result.push({
          id: i,
          title: p.title,
          description: p.description,
          votesFor: p.votesFor.toNumber(),
          votesAgainst: p.votesAgainst.toNumber(),
          executed: p.executed,
        });
      }
      setProposals(result);
    } catch (err) {
      console.error("Error fetching proposals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  return { proposals, loading, refresh: fetchProposals };
};
