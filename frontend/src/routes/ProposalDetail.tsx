import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useProposals } from "../hooks/useProposals";
import VoteButton from "../components/VoteButton";

interface ProposalDetailParams {
  id: string;
}

const ProposalDetail: React.FC = () => {
  const { id } = useParams<keyof ProposalDetailParams>() as ProposalDetailParams;
  const { proposals, fetchProposals } = useProposals();
  const [proposal, setProposal] = useState<any>(null);

  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  useEffect(() => {
    const found = proposals.find((p: any) => p.id === id);
    setProposal(found || null);
  }, [proposals, id]);

  if (!proposal) {
    return (
      <Layout>
        <p>Loading proposal details...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">{proposal.title}</h1>
      <p className="mb-2">{proposal.description}</p>
      <p className="mb-2">Proposer: {proposal.proposer}</p>
      <p className="mb-2">Status: {proposal.status}</p>

      <div className="mt-4">
        <VoteButton proposalId={proposal.id} />
      </div>
    </Layout>
  );
};

export default ProposalDetail;
