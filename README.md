# swap.pet-ethAppSample  
app sample of etherum, support truffle, hardhat, coverage,gas report  
   
  
# Installation Instructions  
in app dir:`$ npx npm i swap-pet-eth-app-sample`  
  
in sol file:`import "swap-pet-eth-app-sample/contracts/SwapPetOracle.sol";`  
  
# create workflow  
```  
mkdir ~/defiApp  
cd defiApp  
npm init  
npm install --save-dev hardhat  
npm install --save-dev @nomiclabs/hardhat-truffle5 @nomiclabs/hardhat-web3 web3  
```

edit config:`$ vi hardhat.config.js`    
  
add gas-reporter:`$ npx npm install -D eth-gas-reporter`  
get gas report:`$ npx truffle test`  
add coverage:`$ npx npm install -D @nomiclabs/buidler solidity-coverage`  
get coverage:`$ npx truffle run coverage`  
run ganache :`$ npx ganache-cli --deterministic`  
compile:`$ npx hardhat compile`  
test:`$ npx hardhat test`  
accounts:`$ npx hardhat accounts`  
account balance:`$ npx hardhat balance --account 0xFABB0ac...`

# fork Mainnet with ganache-cli 
To fork off Mainnet, simply invoke the -f flag on ganache-cli. The -i flag indicates a network ID of 1.
`npx ganache-cli -f https://mainnet.infura.io/v3/{key} -i 1`