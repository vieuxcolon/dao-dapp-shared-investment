// src/modules/votes/votes.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VoteDto } from './dto';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  /* ─────────────────────────────────────────────
   * Cast a vote
   * ───────────────────────────────────────────── */
  @Post()
  async castVote(@Body() body: { voter: `0x${string}`; vote: VoteDto }) {
    const { voter, vote } = body;
    return this.votesService.castVote(voter, vote);
  }

  /* ─────────────────────────────────────────────
   * Get all votes for a proposal
   * ───────────────────────────────────────────── */
  @Get(':proposalId')
  async getVotes(@Param('proposalId') proposalId: string) {
    return this.votesService.getVotes(BigInt(proposalId));
  }

  /* ─────────────────────────────────────────────
   * Get voting results for a proposal
   * ───────────────────────────────────────────── */
  @Get(':proposalId/results')
  async getResults(@Param('proposalId') proposalId: string) {
    return this.votesService.getResults(BigInt(proposalId));
  }
}

