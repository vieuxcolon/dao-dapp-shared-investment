//backend/src/modules/dao/dao.controller.ts
import { Request, Response } from 'express';
import { DaoService } from './dao.service';
import { CreateInvestmentDto } from './dao.types';

export class DaoController {
  private daoService: DaoService;

  constructor(daoService: DaoService) {
    this.daoService = daoService;
  }

  async createInvestment(req: Request, res: Response) {
    try {
      const data = req.body as CreateInvestmentDto;
      const result = await this.daoService.createInvestment(data);
      res.json({ success: true, data: result });
    } catch (err: any) {
      console.error('Create investment error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getInvestment(req: Request, res: Response) {
    try {
      const id = BigInt(req.params.id);
      const investment = await this.daoService.getInvestment(id);
      res.json({ success: true, data: investment });
    } catch (err: any) {
      console.error('Get investment error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getInvestments(req: Request, res: Response) {
    try {
      const investments = await this.daoService.getInvestments();
      res.json({ success: true, data: investments });
    } catch (err: any) {
      console.error('Get investments error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  }
}
