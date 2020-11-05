# swap.pet-ethAppSample  
app sample of etherum, support truffle, hardhat, coverage,gas report  
   
# create workflow  
```  
$ cd ~
$ git clone git@github.com:swappet/swap.pet-ethAppSample.git defiApp  
$ cd defiApp  
$ npx npm install  
$ cp .env.sample .env
```
 
test and get gas report:`$ npx truffle test`     
get coverage:`$ npx truffle run coverage`  
run ganache :`$ npx ganache-cli --deterministic`  
compile:`$ npx hardhat compile`  
test:`$ npx hardhat test`  
accounts:`$ npx hardhat accounts`  
account balance:`$ npx hardhat balance --account 0xFABB0ac...`  
fork mainnet:`$ npx npm run mfork`    
test on fork mainnet:`$ npx npm run tfork`  

# setting
edit setting file:
```
.secret  :  mnemonic  
.infuraKey : https://infura.io key
.etherscan : https://etherscan.io key  
```

# update lib/sdk
```
$ npx npm update swap.pet-lib swap.pet-sdk 
```
swap.pet-lib:for solidity  
swap.pet-sdk:for solidity and js  
 
# fork Mainnet with ganache-cli 
To fork off Mainnet, simply invoke the -f flag on ganache-cli. The -i flag indicates a network ID of 1.
`npx ganache-cli -f https://mainnet.infura.io/v3/{key} -i 1`

This will spawn a Ganache instance at http://localhost:8545. This Infura API key is obtained publicly from https://infura.io. 

**NOTE**:Unfortunately have to restart ganache-cli every 128 blocks (~30 minutes), otherwise you may be greeted with the following message from Infura:`Returned error: project ID does not have access to archive state`