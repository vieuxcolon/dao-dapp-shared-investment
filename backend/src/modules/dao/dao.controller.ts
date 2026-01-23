//backend/src/modules/dao/dao.controller.ts
// src/modules/dao/dao.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { DaoService, Investment } from './dao.service';
import { CreateInvestmentDto } from './dto';

@Controller('dao')
export class DaoController {
  constructor(private readonly daoService: DaoService) {}

  /* ─────────────────────────────
   * Create a new investment
   * ───────────────────────────── */
  @Post('investments')
  async createInvestment(
    @Body() data: CreateInvestmentDto
  ): Promise<{ success: boolean; txHash: `0x${string}` }> {
    // Convert DTO amount to bigint
    const amount = BigInt(data.amount);

    return this.daoService.createInvestment(data.signer, amount);
  }

  /* ─────────────────────────────
   * Get all investments
   * ───────────────────────────── */
  @Get('investments')
  async getInvestments(): Promise<Investment[]> {
    return this.daoService.getInvestments();
  }

  /* ─────────────────────────────
   * Get a single investment by ID
   * (optional filter on the array)
   * ───────────────────────────── */
  @Get('investments/:id')
  async getInvestment(@Param('id') id: string): Promise<Investment | null> {
    const investments = await this.daoService.getInvestments();
    const investmentId = BigInt(id);

    return investments.find(inv => inv.id === investmentId) || null;
  }
}
