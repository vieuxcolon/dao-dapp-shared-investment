// backend/src/modules/proposals/dto/CreateProposalDto.ts
export class CreateProposalDto {
  title: string;
  description: string;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}
