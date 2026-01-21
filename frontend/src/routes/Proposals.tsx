import React, { useEffect } from "react";
import Layout from "../components/Layout";
import ProposalCard from "../components/ProposalCard";
import { useProposals } from "../hooks/useProposals";

const Proposals: React.FC = () => {
  const { proposals, fetchProposals } = useProposals();

  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Proposals</h1>
      <div className="space-y-4">
        {proposals.length === 0 ? (
          <p>No proposals yet.</p>
        ) : (
          proposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))
        )}
      </div>
    </Layout>
  );
};

export default Proposals;
