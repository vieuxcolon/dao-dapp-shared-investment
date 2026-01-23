export interface CreateProposalDto {
  title: string;
  description: string;
  amount: string; // ETH/wei as string
}

export interface VoteDto {
  proposalId: bigint;
  voter: `0x${string}`;
  vote: boolean;
}
