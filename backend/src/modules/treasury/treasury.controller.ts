import { Router, Request, Response } from 'express';
import { TreasuryService } from './treasury.service';

const router = Router();
const treasuryService = new TreasuryService();

// Get treasury balance
router.get('/balance', async (req: Request, res: Response) => {
  try {
    const balance = await treasuryService.getBalance();
    res.json({ balance });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch treasury balance' });
  }
});

// Deposit funds into treasury
router.post('/deposit', async (req: Request, res: Response) => {
  try {
    const { amount, depositor } = req.body;
    const result = await treasuryService.depositFunds(amount, depositor);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to deposit funds' });
  }
});

// Withdraw funds from treasury
router.post('/withdraw', async (req: Request, res: Response) => {
  try {
    const { amount, recipient } = req.body;
    const result = await treasuryService.withdrawFunds(amount, recipient);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to withdraw funds' });
  }
});

export default router;
