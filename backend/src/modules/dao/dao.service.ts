// src/modules/dao/dao.service.ts
import { Injectable } from '@nestjs/common';
import { investmentDAOContract, walletClient } from '../../blockchain/contracts';
import { Account } from 'viem';
import { SubmitInvestmentDto } from './dto';

// Replace with the actual signer address from your wallet client or environment
const SIGNER_ADDRESS = process.env.SIGNER_ADDRESS as `0x${string}`;

@Injectable()
export class DaoService {
  constructor() {}

  // ────────────── SUBMIT INVESTMENT ──────────────
  async submitInvestment(data: SubmitInvestmentDto) {
    if (!SIGNER_ADDRESS) throw new Error('Signer address is not defined');

    // Call the write method on the contract
    const txHash = await investmentDAOContract.write.invest({
      account: SIGNER_ADDRESS,
      args: [data.amount, data.investmentType],
      value: data.amount, // if the contract requires sending ETH
    });

    // Wait for transaction confirmation
    await walletClient.waitForTransactionReceipt({ hash: txHash });

    return { success: true, txHash };
  }

  // ────────────── GET INVESTMENT DETAILS ──────────────
  async getInvestment(investmentId: bigint) {
    const investment = await investmentDAOContract.read.getInvestment([investmentId]);
    return investment;
  }

  // ────────────── GET ALL INVESTMENTS ──────────────
  async getAllInvestments() {
    const investments = await investmentDAOContract.read.getAllInvestments();
    return investments;
  }
}
