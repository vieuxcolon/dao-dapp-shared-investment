import express, { Application, json } from 'express';
import { json as bodyParserJson } from 'body-parser';

// Module imports
import { DaoService } from './modules/dao/dao.service';
import { createDaoRouter } from './modules/dao/dao.routes';

import { ProposalsService } from './modules/proposals/proposals.service';
import { createProposalsRouter } from './modules/proposals/proposals.routes';

import { VotesService } from './modules/votes/votes.service';
import { createVotesRouter } from './modules/votes/votes.routes';

import { TreasuryService } from './modules/treasury/treasury.service';
import { createTreasuryRouter } from './modules/treasury/treasury.routes';

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware() {
    this.app.use(bodyParserJson());
    this.app.use(json());
    // Add other global middleware here (CORS, logging, etc.)
  }

  private setupRoutes() {
    // DAO
    const daoService = new DaoService();
    this.app.use('/api/dao', createDaoRouter(daoService));

    // Proposals
    const proposalsService = new ProposalsService();
    this.app.use('/api/proposals', createProposalsRouter(proposalsService));

    // Votes
    const votesService = new VotesService();
    this.app.use('/api/votes', createVotesRouter(votesService));

    // Treasury
    const treasuryService = new TreasuryService();
    this.app.use('/api/treasury', createTreasuryRouter(treasuryService));
  }

  public async init() {
    // Any async initialization if needed
    // e.g., blockchain clients, background tasks
  }
}
