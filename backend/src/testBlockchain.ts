// backend/src/testBlockchain.ts
import 'dotenv/config';
import { TreasuryService } from './modules/treasury/treasury.service';
import { VotesService } from './modules/votes/votes.service';

async function main() {
  const treasury = new TreasuryService();
  const votes = new VotesService();

  try {
    console.log('--- Testing TreasuryService ---');
    const balance = await treasury.getBalance();
    console.log('Treasury balance:', balance);

    // Uncomment to test deposit/withdraw (requires local blockchain or testnet)
    // const deposit = await treasury.depositFunds('0.01', '0xYourWalletHere');
    // console.log('Deposit result:', deposit);

    // const withdraw = await treasury.withdrawFunds('0.01', '0xYourWalletHere');
    // console.log('Withdraw result:', withdraw);

    console.log('--- Testing VotesService ---');
    // Replace with a real proposalId from your contract
    const votesForProposal = await votes.getVotes(1n);
    console.log('Votes for proposal #1:', votesForProposal);

    // Uncomment to test casting a vote
    // const cast = await votes.castVote({ proposalId: 1, voter: '0xYourWalletHere', support: true, weight: 1 });
    // console.log('Cast vote result:', cast);

    console.log('✅ Blockchain services test completed successfully');
  } catch (err) {
    console.error('❌ Error during blockchain test:', err);
  }
}

main();
