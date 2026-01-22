// backend/src/modules/dao/dao.service.ts
import {
  investmentDAOContract,
  client,
  walletClient,
} from '../../blockchain/contracts';
import { parseEther } from 'viem';

export class DAOService {
  // Create a new investment (on-chain tx)
  async createInvestment(amount: string, investor: `0x${string}`) {
    const hash = await walletClient.writeContract({
      address: investmentDAOContract.address,
      abi: investmentDAOContract.abi,
      functionName: 'createInvestment',
      args: [parseEther(amount)],
      account: investor,
    });

    const receipt = await client.waitForTransactionReceipt({ hash });

    return {
      success: true,
      txHash: receipt.transactionHash,
    };
  }

  // Fetch all investments (read-only)
  async getInvestments() {
    return investmentDAOContract.read.getInvestments();
  }
}
