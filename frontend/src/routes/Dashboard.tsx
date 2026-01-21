import React from "react";
import Layout from "../components/Layout";

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-2xl font-bold">DAO Dashboard</h1>
      <p>Welcome to your shared investment DAO!</p>
      {/* TODO: Add summary of proposals, treasury, and voting stats */}
    </Layout>
  );
};

export default Dashboard;
