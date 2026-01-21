import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("🚀 Deploying contracts with account:", deployer.address);
  console.log("💰 Balance:", (await deployer.getBalance()).toString());

  // Governance token
  const Token = await ethers.getContractFactory("GovernanceToken");
  const token = await Token.deploy();
  await token.waitForDeployment();

  console.log("✅ GovernanceToken deployed to:", await token.getAddress());

  // DAO
  const DAO = await ethers.getContractFactory("InvestmentDAO");
  const dao = await DAO.deploy(await token.getAddress());
  await dao.waitForDeployment();

  console.log("✅ InvestmentDAO deployed to:", await dao.getAddress());

  // Treasury
  const Treasury = await ethers.getContractFactory("Treasury");
  const treasury = await Treasury.deploy(await dao.getAddress());
  await treasury.waitForDeployment();

  console.log("✅ Treasury deployed to:", await treasury.getAddress());

  // Wire treasury into DAO
  const tx = await dao.setTreasury(await treasury.getAddress());
  await tx.wait();

  console.log("🔗 Treasury linked to DAO");

  console.log("🎉 Deployment complete");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
