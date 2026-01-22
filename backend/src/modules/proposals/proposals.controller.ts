import { Router, Request, Response } from 'express';
import { ProposalsService } from './proposals.service';

const router = Router();
const service = new ProposalsService();

/**
 * GET proposal by id
 * /proposals/:proposalId
 */
router.get('/:proposalId', async (req: Request, res: Response) => {
  try {
    const proposalId = BigInt(req.params.proposalId);
    const proposal = await service.getProposalById(proposalId);
    res.json(proposal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch proposal' });
  }
});

/**
 * Create proposal (on-chain tx)
 * POST /proposals
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const proposal = await service.createProposal(
      req.body,
      req.body.signer, // or injected from auth middleware
    );
    res.status(201).json(proposal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create proposal' });
  }
});

export default router;
