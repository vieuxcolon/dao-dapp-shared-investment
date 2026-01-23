//backend/src/modules/dao/dao.controller.ts
import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { DaoService, Investment } from './dao.service';
import { CreateInvestmentDto } from './dto';

@Controller('dao') // Base route for all DAO endpoints
export class DaoController {
  constructor(private readonly daoService: DaoService) {}

  /* ─────────────────────────────
   * Create a new investment
   * ───────────────────────────── */
  @Post('investments')
  async createInvestment(
    @Body() data: CreateInvestmentDto
  ): Promise<{ success: boolean; txHash: `0x${string}` }> {
    // Pass signer and amount to the service
    return this.daoService.createInvestment(data.signer, data.amount);
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
   * ───────────────────────────── */
  @Get('investments/:id')
  async getInvestment(@Param('id') id: string): Promise<Investment | null> {
    // Convert string ID to bigint
    return this.daoService.getInvestment(BigInt(id));
  }
}

