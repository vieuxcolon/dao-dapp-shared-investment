import { Request, Response } from 'express';
import { TreasuryService } from './treasury.service';

export class TreasuryController {
  constructor(private treasuryService: TreasuryService) {}

  async deposit(req: Request, res: Response) {
    try {
      const { depositor, amount } = req.body as { depositor: `0x${string}`; amount: string };
      const result = await this.treasuryService.depositFunds(depositor, BigInt(amount));
      res.json(result);
    } catch (err: any) {
      console.error('Deposit error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async withdraw(req: Request, res: Response) {
    try {
      const { recipient, amount } = req.body as { recipient: `0x${string}`; amount: string };
      const result = await this.treasuryService.withdrawFunds(recipient, BigInt(amount));
      res.json(result);
    } catch (err: any) {
      console.error('Withdraw error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getBalance(req: Request, res: Response) {
    try {
      const balance = await this.treasuryService.getBalance();
      res.json({ balance });
    } catch (err: any) {
      console.error('Get balance error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  }
}
