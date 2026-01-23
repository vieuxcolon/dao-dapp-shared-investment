// backend/src/modules/dao/dao.service.ts
import { Injectable } from '@nestjs/common';
import { walletClient, publicClient } from '../../blockchain/viemClient';
import { daoContract } from '../../blockchain/contracts';
import { CreateInvestmentDto, InvestmentTxResult } from './dao.types';

@Injectable()
export class DaoService {
  // ───────────────
  // Create investment (WRITE)
  // ───────────────
  async createInvestment(data: CreateInvestmentDto): Promise<InvestmentTxResult> {
    const amountBigInt = BigInt(data.amount);

    const txHash: `0x${string}` = await walletClient.writeContract({
      address: daoContract.address,
      abi: daoContract.abi,
      functionName: 'invest',
      args: [data.investor, amountBigInt, data.proposalId ?? 0n],
      account: data.investor,
    });

    await walletClient.waitForTransactionReceipt({ hash: txHash });

    return { txHash, status: 'success' };
  }

  // ───────────────
  // Read investments (READ)
  // ───────────────
  async getInvestment(id: bigint) {
    return publicClient.readContract({
      address: daoContract.address,
      abi: daoContract.abi,
      functionName: 'getInvestment',
      args: [id],
    });
  }

  async getInvestments(): Promise<Investment[]> {
    return publicClient.readContract({
      address: daoContract.address,
      abi: daoContract.abi,
      functionName: 'getAllInvestments',
      args: [],
    });
  }
}
