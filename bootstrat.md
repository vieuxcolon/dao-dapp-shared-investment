git clone https://github.com/vieuxcolon/dao-dapp-shared-investment.git
cd dao-dapp-shared-investment
docker run --rm -it -v $(pwd):/app dao-dapp-bootstrap bash
hardhat --init
cd contracts
npm install @openzeppelin/contracts
npx hardhat compile
