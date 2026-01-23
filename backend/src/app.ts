// backend/src/app.ts
import express, { Application, json } from 'express';
import { json as bodyParserJson } from 'body-parser';
import { DaoController } from './modules/dao/dao.controller';
import { ProposalsController } from './modules/proposals/proposals.controller';
import { VotesController } from './modules/votes/votes.controller';
import { TreasuryController } from './modules/treasury/treasury.controller';
import { DaoService } from './modules/dao/dao.service';
import { ProposalsService } from './modules/proposals/proposals.service';
import { VotesService } from './modules/votes/votes.service';
import { TreasuryService } from './modules/treasury/treasury.service';

export class App {
  public app: Application;

  // Services
  private daoService = new DaoService();
  private proposalsService = new ProposalsService();
  private votesService = new VotesService();
  private treasuryService = new TreasuryService();

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupControllers();
  }

  private setupMiddleware() {
    this.app.use(bodyParserJson());
    this.app.use(json());
    // Add global middleware like CORS, logging, auth, etc.
  }

  private setupControllers() {
    const daoController = new DaoController(this.daoService);
    const proposalsController = new ProposalsController(this.proposalsService);
    const votesController = new VotesController(this.votesService);
    const treasuryController = new TreasuryController(this.treasuryService);

    this.app.use('/api/dao', daoController.router);
    this.app.use('/api/proposals', proposalsController.router);
    this.app.use('/api/votes', votesController.router);
    this.app.use('/api/treasury', treasuryController.router);
  }

  public async init() {
    // Add async initialization if needed (e.g., blockchain listeners)
    // Example: startBlockchainEventListeners();
  }
}
