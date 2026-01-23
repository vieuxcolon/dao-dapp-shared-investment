// src/modules/proposals/proposals.controller.ts
import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { CreateProposalDto, VoteDto } from './dto';

@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) {}

  /* ─────────────────────────────────────────────
   * Create a new proposal
   * ───────────────────────────────────────────── */
  @Post()
  async createProposal(
    @Body() body: { signer: `0x${string}`; data: CreateProposalDto },
  ) {
    return this.proposalsService.createProposal(body.signer, body.data);
  }

  /* ─────────────────────────────────────────────
   * Vote on a proposal
   * ───────────────────────────────────────────── */
  @Post('vote')
  async vote(@Body() body: { voter: `0x${string}`; data: VoteDto }) {
    return this.proposalsService.vote(body.voter, body.data);
  }

  /* ─────────────────────────────────────────────
   * Get a single proposal
   * ───────────────────────────────────────────── */
  @Get(':id')
  async getProposal(@Param('id') id: string) {
    return this.proposalsService.getProposal(BigInt(id));
  }

  /* ─────────────────────────────────────────────
   * Get votes for a proposal
   * ───────────────────────────────────────────── */
  @Get(':id/votes')
  async getVotes(@Param('id') id: string) {
    return this.proposalsService.getVotes(BigInt(id));
  }

  /* ─────────────────────────────────────────────
   * Get results for a proposal
   * ───────────────────────────────────────────── */
  @Get(':id/results')
  async getResults(@Param('id') id: string) {
    return this.proposalsService.getResults(BigInt(id));
  }
}
