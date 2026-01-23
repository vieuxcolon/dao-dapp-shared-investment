// backend/src/modules/proposals/proposals.controller.ts
import { Router, Request, Response } from 'express';
import { ProposalsService } from './proposals.service';
import { CreateProposalDto, VoteDto } from './dto';

export class ProposalsController {
  public router: Router;
  private proposalsService: ProposalsService;

  constructor(proposalsService: ProposalsService) {
    this.router = Router();
    this.proposalsService = proposalsService;
    this.registerRoutes();
  }

  private registerRoutes() {
    // ─────────────────────────────
    // Create a proposal
    // ─────────────────────────────
    this.router.post('/', async (req: Request, res: Response) => {
      try {
        const { signer, data } = req.body as { signer: `0x${string}`, data: CreateProposalDto };
        const result = await this.proposalsService.createProposal(signer, data);
        res.json(result);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create proposal' });
      }
    });

    // ─────────────────────────────
    // Vote on a proposal
    // ─────────────────────────────
    this.router.post('/vote', async (req: Request, res: Response) => {
      try {
        const { voter, data } = req.body as { voter: `0x${string}`, data: VoteDto };
        const result = await this.proposalsService.vote(voter, data);
        res.json(result);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to cast vote' });
      }
    });

    // ─────────────────────────────
    // Get a single proposal
    // ─────────────────────────────
    this.router.get('/:id', async (req: Request, res: Response) => {
      try {
        const proposalId = BigInt(req.params.id);
        const result = await this.proposalsService.getProposal(proposalId);
        res.json(result);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch proposal' });
      }
    });

    // ─────────────────────────────
    // Get votes for a proposal
    // ─────────────────────────────
    this.router.get('/:id/votes', async (req: Request, res: Response) => {
      try {
        const proposalId = BigInt(req.params.id);
        const result = await this.proposalsService.getVotes(proposalId);
        res.json(result);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch votes' });
      }
    });

    // ─────────────────────────────
    // Get results for a proposal
    // ─────────────────────────────
    this.router.get('/:id/results', async (req: Request, res: Response) => {
      try {
        const proposalId = BigInt(req.params.id);
        const result = await this.proposalsService.getResults(proposalId);
        res.json(result);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch results' });
      }
    });
  }
}
