import { DAO } from './dao.types';
import { viemClient, contracts } from '../../blockchain';

export class DAOService {
  constructor() {}

  // Fetch general DAO information from the smart contract
  async fetchDAOInfo(): Promise<DAO> {
    try {
      const daoContract = contracts.daoContract(viemClient);
      const name = await daoContract.name();
      const symbol = await daoContract.symbol();
      const totalMembers = await daoContract.totalMembers();
      const treasuryBalance = await daoContract.treasuryBalance();

      return {
        name,
        symbol,
        totalMembers: Number(totalMembers),
        treasuryBalance: Number(treasuryBalance),
      };
    } catch (error) {
      console.error('Error fetching DAO info:', error);
      throw error;
    }
  }

  // Fetch DAO members
  async fetchMembers(): Promise<string[]> {
    try {
      const daoContract = contracts.daoContract(viemClient);
      const members = await daoContract.getMembers();
      return members;
    } catch (error) {
      console.error('Error fetching DAO members:', error);
      throw error;
    }
  }
}
