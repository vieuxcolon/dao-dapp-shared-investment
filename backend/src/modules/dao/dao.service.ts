// backend/src/modules/dao/dao.service.ts
import { Injectable } from '@nestjs/common';
import { walletClient, publicClient } from '../../blockchain/viemClient';
import { daoContract } from '../../blockchain/contracts';
import { DaoAction } from './dao.types';

@Injectable()
export class DaoService {
  /* ─────────────────────────────────────────────
   * Get DAO general info (READ)
   * ───────────────────────────────────────────── */
  async getDaoInfo() {
    try {
      return await publicClient.readContract({
        address: daoContract.address,
        abi: daoContract.abi,
        functionName: 'getDaoInfo',
        args: [],
      });
    } catch (err) {
      console.error('Error fetching DAO info:', err);
      throw err;
    }
  }

  /* ─────────────────────────────────────────────
   * Get all DAO members (READ)
   * ───────────────────────────────────────────── */
  async getMembers() {
    try {
      return await publicClient.readContract({
        address: daoContract.address,
        abi: daoContract.abi,
        functionName: 'getMembers',
        args: [],
      });
    } catch (err) {
      console.error('Error fetching DAO members:', err);
      throw err;
    }
  }

  /* ─────────────────────────────────────────────
   * Execute a DAO action (WRITE)
   * ───────────────────────────────────────────── */
  async executeAction(signer: `0x${string}`, action: DaoAction) {
    try {
      const txHash: `0x${string}` = await walletClient.writeContract({
        address: daoContract.address,
        abi: daoContract.abi,
        functionName: 'executeAction',
        args: [action.type, action.payload],
        account: signer,
      });

      await walletClient.waitForTransactionReceipt({ hash: txHash });
      return { success: true, txHash };
    } catch (err) {
      console.error('Error executing DAO action:', err);
      throw err;
    }
  }
}
