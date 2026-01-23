//backend/src/app.ts
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { createProposalsRouter } from './modules/proposals/proposals.routes';
import { createTreasuryRouter } from './modules/treasury/treasury.routes';
import { createDaoRouter } from './modules/dao/dao.routes';
import votesRouter from './modules/votes/votes.routes';

import { ProposalsService } from './modules/proposals/proposals.service';
import { TreasuryService } from './modules/treasury/treasury.service';
import { DaoService } from './modules/dao/dao.service';
import { VotesService } from './modules/votes/votes.service';

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(helmet());
  app.use(morgan('dev'));

  const proposalsService = new ProposalsService();
  const treasuryService = new TreasuryService();
  const daoService = new DaoService();
  const votesService = new VotesService();

  app.use('/api/proposals', createProposalsRouter(proposalsService));
  app.use('/api/votes', votesRouter); // already default export
  app.use('/api/dao', createDaoRouter(daoService));
  app.use('/api/treasury', createTreasuryRouter(treasuryService));

  app.get('/', (_req, res) => {
    res.send('Backend running 🚀');
  });

  return app;
}
