import { Router, Request, Response } from 'express';
import { ProposalsService } from './proposals.service';

export class ProposalsController {
  public router: Router;
  private service: ProposalsService;

  constructor() {
    this.router = Router();
    this.service = new ProposalsService();
    this.routes();
  }

  private routes() {
    this.router.get('/', this.getAllProposals.bind(this));
    this.router.get('/:id', this.getProposalById.bind(this));
    this.router.post('/', this.createProposal.bind(this));
  }

  private async getAllProposals(req: Request, res: Response) {
    try {
      const proposals = await this.service.getAllProposals();
      res.json(proposals);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  private async getProposalById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const proposal = await this.service.getProposalById(id);
      res.json(proposal);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  private async createProposal(req: Request, res: Response) {
    try {
      const proposalData = req.body;
      const proposal = await this.service.createProposal(proposalData);
      res.status(201).json(proposal);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
}
