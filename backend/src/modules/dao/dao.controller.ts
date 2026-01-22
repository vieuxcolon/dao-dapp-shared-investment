import { Router, Request, Response } from 'express';
import { DAOService } from './dao.service';

const router = Router();
const daoService = new DAOService();

/**
 * GET DAO investments
 * /dao/investments
 */
router.get('/investments', async (_req: Request, res: Response) => {
  try {
    const investments = await daoService.getInvestments();
    res.json(investments);
  } catch (error) {
    console.error('Error fetching investments:', error);
    res.status(500).json({ error: 'Failed to fetch investments' });
  }
});

/**
 * Create a new investment
 * POST /dao/invest
 */
router.post('/invest', async (req: Request, res: Response) => {
  try {
    const { amount, investor } = req.body;
    const result = await daoService.createInvestment(amount, investor);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating investment:', error);
    res.status(500).json({ error: 'Failed to create investment' });
  }
});

export default router;

