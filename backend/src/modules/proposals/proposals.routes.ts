import { Router } from 'express';
import { ProposalsController } from './proposals.controller';
import { ProposalsService } from './proposals.service';

export function createProposalsRouter(proposalsService: ProposalsService) {
  const router = Router();
  const controller = new ProposalsController(proposalsService);

  // ─────────────────────────────
  // Proposal routes
  // ─────────────────────────────
  router.post('/', (req, res) => controller.createProposal(req, res));      // Create proposal
  router.post('/vote', (req, res) => controller.vote(req, res));            // Vote
  router.get('/:id', (req, res) => controller.getProposal(req, res));       // Get proposal
  router.get('/:id/votes', (req, res) => controller.getVotes(req, res));    // Get votes
  router.get('/:id/results', (req, res) => controller.getResults(req, res)); // Get results

  return router;
}
