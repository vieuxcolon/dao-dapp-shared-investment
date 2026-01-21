// Types and interfaces for the DAO module

export interface DAO {
  name: string;
  symbol: string;
  totalMembers: number;
  treasuryBalance: number;
}

export interface Member {
  address: string;
  shares: number;
}

export interface Proposal {
  id: number;
  title: string;
  description: string;
  creator: string;
  status: 'Pending' | 'Active' | 'Executed' | 'Rejected';
  votesFor: number;
  votesAgainst: number;
}

export interface Vote {
  voter: string;
  proposalId: number;
  support: boolean; // true = yes, false = no
  weight: number;
}
