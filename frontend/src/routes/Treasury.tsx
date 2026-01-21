import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDAO } from "../hooks/useDAO";

const Treasury: React.FC = () => {
  const { getTreasuryBalance } = useDAO();
  const [balance, setBalance] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBalance = async () => {
      setLoading(true);
      setError("");
      try {
        const bal = await getTreasuryBalance();
        setBalance(bal);
      } catch (err: any) {
        setError(err.message || "Failed to fetch treasury balance");
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [getTreasuryBalance]);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Treasury</h1>
      {loading && <p>Loading treasury balance...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <p className="text-lg">Current Treasury Balance: {balance} ETH</p>
      )}
    </Layout>
  );
};

export default Treasury;
