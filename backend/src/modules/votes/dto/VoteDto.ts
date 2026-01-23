// backend/src/modules/votes/dto/VoteDto.ts
export class VoteDto {
  proposalId: bigint;
  support: boolean;
  weight: bigint;

  constructor(proposalId: bigint, support: boolean, weight: bigint) {
    this.proposalId = proposalId;
    this.support = support;
    this.weight = weight;
  }
}
