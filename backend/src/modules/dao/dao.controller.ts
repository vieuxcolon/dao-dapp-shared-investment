import { Request, Response } from 'express';
import { DAOService } from './dao.service';
import { DAO } from './dao.types';

export class DAOController {
  private daoService: DAOService;

  constructor() {
    this.daoService = new DAOService();
  }

  async getDAOInfo(req: Request, res: Response) {
    try {
      const dao: DAO = await this.daoService.fetchDAOInfo();
      res.json(dao);
    } catch (error) {
      console.error('Error fetching DAO info:', error);
      res.status(500).json({ error: 'Failed to fetch DAO info' });
    }
  }

  async getMembers(req: Request, res: Response) {
    try {
      const members = await this.daoService.fetchMembers();
      res.json(members);
    } catch (error) {
      console.error('Error fetching DAO members:', error);
      res.status(500).json({ error: 'Failed to fetch DAO members' });
    }
  }
}
