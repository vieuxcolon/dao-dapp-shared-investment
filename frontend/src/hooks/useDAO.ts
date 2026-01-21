import { useState, useEffect } from "react";
import { getDaoContract } from "../lib/contracts";
import { ethers } from "ethers";

export interface DAOInfo {
  totalInvested: string;
  memberCount: number;
}

export const useDAO = () => {
  const [daoInfo, setDaoInfo] = useState<DAOInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDAOInfo = async () => {
    try {
      const contract = await getDaoContract();
      const totalInvested = await contract.totalInvested();
      const memberCount = await contract.memberCount();
      setDaoInfo({
        totalInvested: ethers.utils.formatEther(totalInvested),
        memberCount: memberCount.toNumber(),
      });
    } catch (err) {
      console.error("Error fetching DAO info:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDAOInfo();
  }, []);

  return { daoInfo, loading, refresh: fetchDAOInfo };
};
