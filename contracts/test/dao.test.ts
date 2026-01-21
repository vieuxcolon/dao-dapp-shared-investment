import { expect } from "chai";
import { ethers } from "hardhat";
import { InvestmentDAO, Governance, Treasury } from "../typechain-types";

describe("InvestmentDAO DApp Core Contracts", function () {
  let investmentDAO: InvestmentDAO;
  let governance: Governance;
  let treasury: Treasury;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy Treasury
    const TreasuryFactory = await ethers.getContractFactory("Treasury");
    treasury = (await TreasuryFactory.deploy()) as Treasury;
    await treasury.deployed();

    // Deploy Governance
    const GovernanceFactory = await ethers.getContractFactory("Governance");
    governance = (await GovernanceFactory.deploy()) as Governance;
    await governance.deployed();

    // Deploy InvestmentDAO
    const DAOfactory = await ethers.getContractFactory("InvestmentDAO");
    investmentDAO = (await DAOfactory.deploy(
      governance.address,
      treasury.address
    )) as InvestmentDAO;
    await investmentDAO.deployed();
  });

  it("should deploy all contracts successfully", async function () {
    expect(investmentDAO.address).to.properAddress;
    expect(governance.address).to.properAddress;
    expect(treasury.address).to.properAddress;
  });

  it("should allow creating a proposal via Governance", async function () {
    await governance.connect(owner).createProposal("Invest in project X", 100);
    const proposals = await governance.getProposals();
    expect(proposals.length).to.equal(1);
    expect(proposals[0].description).to.equal("Invest in project X");
  });

  it("should allow voting on a proposal", async function () {
    await governance.connect(owner).createProposal("Invest in project X", 100);
    await governance.connect(addr1).vote(0, true);
    const proposal = await governance.getProposal(0);
    expect(proposal.yesVotes).to.equal(1);
  });

  it("should allow transferring funds via Treasury", async function () {
    // Deposit some funds to treasury
    await owner.sendTransaction({ to: treasury.address, value: ethers.utils.parseEther("1") });
    const initialBalance = await ethers.provider.getBalance(treasury.address);
    expect(initialBalance).to.equal(ethers.utils.parseEther("1"));

    // Transfer funds
    await treasury.connect(owner).transfer(addr1.address, ethers.utils.parseEther("0.5"));
    const finalBalance = await ethers.provider.getBalance(treasury.address);
    expect(finalBalance).to.equal(ethers.utils.parseEther("0.5"));
  });

  it("should integrate DAO, Governance, and Treasury", async function () {
    await governance.connect(owner).createProposal("Fund project Y", 0.5);
    await governance.connect(addr1).vote(0, true);

    // Assume proposal passed
    await treasury.connect(owner).transfer(addr2.address, ethers.utils.parseEther("0.5"));
    const balance = await ethers.provider.getBalance(addr2.address);
    expect(balance).to.equal(ethers.utils.parseEther("0.5"));
  });
});
