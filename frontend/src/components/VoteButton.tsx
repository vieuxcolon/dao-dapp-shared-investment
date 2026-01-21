import React, { useState } from "react";

interface VoteButtonProps {
  proposalId: number;
  onVote: (proposalId: number, vote: "yes" | "no") => Promise<void>;
}

const VoteButton: React.FC<VoteButtonProps> = ({ proposalId, onVote }) => {
  const [loading, setLoading] = useState(false);

  const handleVote = async (vote: "yes" | "no") => {
    try {
      setLoading(true);
      await onVote(proposalId, vote);
    } catch (err) {
      console.error("Vote failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex space-x-2 mt-2">
      <button
        disabled={loading}
        onClick={() => handleVote("yes")}
        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >
        Yes
      </button>
      <button
        disabled={loading}
        onClick={() => handleVote("no")}
        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
      >
        No
      </button>
    </div>
  );
};

export default VoteButton;
