import express, { Application } from 'express';
import { json, urlencoded } from 'body-parser';
import { config } from './config/env';

// Services
import { ProposalsService } from './modules/proposals/proposals.service';
import { VotesService } from './modules/votes/votes.service';
import { TreasuryService } from './modules/treasury/treasury.service';

// Routers
import createProposalsRouter from './modules/proposals/proposals.routes';
import { createVotesRouter } from './modules/votes/votes.routes';
import { createTreasuryRouter } from './modules/treasury/treasury.routes';

export class App {
  public app: Application;

  constructor() {
    this.app = express();
  }

  public async init() {
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware() {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private setupRoutes() {
    // Instantiate services
    const proposalsService = new ProposalsService();
    const votesService = new VotesService();
    const treasuryService = new TreasuryService();

    // Mount module routers
    this.app.use('/proposals', createProposalsRouter(proposalsService));
    this.app.use('/votes', createVotesRouter(votesService));
    this.app.use('/treasury', createTreasuryRouter(treasuryService));

    // Health check
    this.app.get('/health', (req, res) => res.json({ status: 'ok' }));
  }
}
