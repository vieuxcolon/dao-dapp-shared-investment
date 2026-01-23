// backend/src/modules/votes/votes.controller.ts
import { Router, Request, Response } from 'express';
import { VotesService } from './votes.service';
import { VoteDto } from './dto';

export class VotesController {
  public router: Router;
  private votesService: VotesService;

  constructor(votesService: VotesService) {
    this.router = Router();
    this.votesService = votesService;
    this.registerRoutes();
  }

  private registerRoutes() {
    // ─────────────────────────────
    // Cast a vote
    // ─────────────────────────────
    this.router.post('/', async (req: Request, res: Response) => {
      try {
        const { voter, data } = req.body as { voter: `0x${string}`, data: VoteDto };
        const result = await this.votesService.vote(voter, data);
        res.json(result);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to cast vote' });
      }
    });

    // ─────────────────────────────
    // Get votes for a proposal
    // ─────────────────────────────
    this.router.get('/:proposalId', async (req: Request, res: Response) => {
      try {
        const proposalId = BigInt(req.params.proposalId);
        const result = await this.votesService.getVotes(proposalId);
        res.json(result);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch votes' });
      }
    });

    // ─────────────────────────────
    // Get results for a proposal
    // ─────────────────────────────
    this.router.get('/:proposalId/results', async (req: Request, res: Response) => {
      try {
        const proposalId = BigInt(req.params.proposalId);
        const result = await this.votesService.getResults(proposalId);
        res.json(result);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch results' });
      }
    });
  }
}
