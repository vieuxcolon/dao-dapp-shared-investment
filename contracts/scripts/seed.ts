import { ethers } from "hardhat";

async function main() {
  const [deployer, alice, bob] = await ethers.getSigners();

  console.log("🌱 Seeding DAO state...");

  // Load deployed contracts
  const daoAddress = process.env.DAO_ADDRESS!;
  const tokenAddress = process.env.TOKEN_ADDRESS!;

  if (!daoAddress || !tokenAddress) {
    throw new Error("❌ DAO_ADDRESS or TOKEN_ADDRESS not set");
  }

  const DAO = await ethers.getContractAt("InvestmentDAO", daoAddress);
  const Token = await ethers.getContractAt("GovernanceToken", tokenAddress);

  // Mint tokens
  console.log("🪙 Minting governance tokens...");
  await (await Token.mint(alice.address, ethers.parseEther("100"))).wait();
  await (await Token.mint(bob.address, ethers.parseEther("50"))).wait();

  console.log("✅ Tokens minted");

  // Create proposal
  console.log("📝 Creating proposal...");
  const tx = await DAO.createProposal(
    "Initial investment proposal",
    "Invest 10 ETH into strategy A"
  );
  await tx.wait();

  console.log("✅ Proposal created");

  // Vote
  console.log("🗳️ Casting votes...");
  await (await DAO.connect(alice).vote(0, true)).wait();
  await (await DAO.connect(bob).vote(0, true)).wait();

  console.log("🎉 DAO seeded successfully");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
