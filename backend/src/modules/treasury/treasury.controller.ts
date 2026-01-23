// src/modules/treasury/treasury.controller.ts
import { Controller, Post, Get, Body } from '@nestjs/common';
import { TreasuryService } from './treasury.service';

@Controller('treasury')
export class TreasuryController {
  constructor(private readonly treasuryService: TreasuryService) {}

  /* ─────────────────────────────────────────────
   * Deposit funds
   * ───────────────────────────────────────────── */
  @Post('deposit')
  async depositFunds(
    @Body() body: { depositor: `0x${string}`; amount: string },
  ) {
    return this.treasuryService.depositFunds(
      body.depositor,
      BigInt(body.amount),
    );
  }

  /* ─────────────────────────────────────────────
   * Withdraw funds
   * ───────────────────────────────────────────── */
  @Post('withdraw')
  async withdrawFunds(
    @Body() body: { recipient: `0x${string}`; amount: string },
  ) {
    return this.treasuryService.withdrawFunds(
      body.recipient,
      BigInt(body.amount),
    );
  }

  /* ─────────────────────────────────────────────
   * Get treasury balance
   * ───────────────────────────────────────────── */
  @Get('balance')
  async getBalance() {
    return this.treasuryService.getBalance();
  }
}
