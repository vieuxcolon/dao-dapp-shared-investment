// backend/src/modules/treasury/treasury.routes.ts
import { Router } from 'express';
import { TreasuryService } from './treasury.service';

const router = Router();
const treasuryService = new TreasuryService();

// GET /treasury/balance
router.get('/balance', async (req, res) => {
  try {
    const balance = await treasuryService.getBalance();
    res.json({ balance });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get treasury balance' });
  }
});

// POST /treasury/deposit?amount=1
router.post('/deposit', async (req, res) => {
  const { amount } = req.query;
  const fromAddress = req.body.from; // e.g., one of your Hardhat accounts

  if (!amount || !fromAddress) {
    return res.status(400).json({ error: 'Missing amount or from address' });
  }

  try {
    const txHash = await treasuryService.depositFunds(amount as string, fromAddress as `0x${string}`);
    res.json({ txHash });
  } catch (err) {
    res.status(500).json({ error: 'Failed to deposit funds' });
  }
});

export default router;
