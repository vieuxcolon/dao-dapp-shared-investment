import React from "react";
import { Proposal } from "../hooks/useProposals";

interface ProposalCardProps {
  proposal: Proposal;
  onSelect?: (id: number) => void;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ proposal, onSelect }) => {
  return (
    <div className="proposal-card border rounded-lg p-4 shadow-md mb-4">
      <h3 className="text-lg font-bold">{proposal.title}</h3>
      <p className="text-sm text-gray-600">{proposal.description}</p>
      <p className="mt-2 text-sm">
        Status:{" "}
        <span className={`font-semibold ${proposal.executed ? "text-green-600" : "text-red-600"}`}>
          {proposal.executed ? "Executed" : "Pending"}
        </span>
      </p>
      <p className="mt-1 text-sm">Votes: {proposal.yesVotes} / {proposal.noVotes}</p>
      {onSelect && (
        <button
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => onSelect(proposal.id)}
        >
          View Details
        </button>
      )}
    </div>
  );
};

export default ProposalCard;
