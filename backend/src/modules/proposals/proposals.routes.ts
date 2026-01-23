import { Router } from 'express';
import { ProposalsController } from './proposals.controller';
import { ProposalsService } from './proposals.service';

export function createProposalsRouter(proposalsService: ProposalsService) {
  const router = Router();
  const controller = new ProposalsController(proposalsService);

  router.post('/', (req, res) => controller.createProposal(req, res));
  router.post('/vote', (req, res) => controller.vote(req, res));
  router.get('/:id', (req, res) => controller.getProposal(req, res));
  router.get('/:id/votes', (req, res) => controller.getVotes(req, res));
  router.get('/:id/results', (req, res) => controller.getResults(req, res));

  return router;
}
