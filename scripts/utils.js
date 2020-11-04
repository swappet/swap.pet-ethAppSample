// SPDX-License-Identifier: Apache-2.0
// Copyright 2020 Swap.Pet@pm.me
// scripts/utils.js 
const { ethers } = require('ethers'); 
const fs = require('fs'); 
const path = require('path');  
require("dotenv").config();  
const ganache = require("ganache-core");  
const { spawn } = require('child_process');

const infuraKey = fs.readFileSync(path.resolve(__dirname, '../.infuraKey')).toString().trim(); 
console.log(`infuraKey: ${infuraKey}\n`);
const mainetURL = `https://mainnet.infura.io/v3/${infuraKey}` 
console.log(`mainetURL: ${mainetURL}\n`);

const fromWei = (x, decimals) => ethers.utils.formatUnits(x, decimals);

const mineBlock = async (provider, timestamp) =>
  await provider.send("evm_mine", [timestamp]);

const increaseTime = async (provider, secsToIncrease) => {
  const blockNumber = await provider.getBlockNumber();
  const { timestamp: currentTimestamp } = await provider.getBlock(blockNumber);
  const newTime = Number(currentTimestamp) + Number(secsToIncrease);
  await mineBlock(provider, newTime);
};

const getTestFiles = async (path) => { 
    const tests = await fs.readdirSync(path, 'utf-8');
    let files = [{name:'tesl all',value:'all'}];
    tests.forEach(async (subDir1, index) => {
        let stat = fs.statSync(path + subDir1);
        if(subDir1 !== 'lib'){
            if (stat.isDirectory()) {
                let subTests = await fs.readdirSync(path + subDir1 + '/', 'utf-8');
                subTests.forEach((subDir2, index) => {
                    files.push(subDir1 + '/' + subDir2);
                })
            } else {
                files.push(subDir1);
            }
        }
    })
    return files;
}

const forkChain = async () => {
  if (!infuraKey || !process.env.PRIV_KEY_DEPLOY) {
    throw Error("infuraKey err OR PRIV_KEY_DEPLOY not found in .env");
  }  
  const server = ganache.server({ 
    port: process.env.PORT,
    fork: mainetURL,
    network_id: 1,
    accounts: [
      {
        secretKey: process.env.PRIV_KEY_DEPLOY,
        balance: ethers.utils.hexlify(ethers.utils.parseEther("1000")),
      },
      {
        secretKey: process.env.PRIV_KEY_TEST1,
        balance: ethers.utils.hexlify(ethers.utils.parseEther("10")),
      },
      {
        secretKey: process.env.PRIV_KEY_TEST2,
        balance: ethers.utils.hexlify(ethers.utils.parseEther("100")),
      },
      {
        secretKey: process.env.PRIV_KEY_TEST3,
        balance: ethers.utils.hexlify(ethers.utils.parseEther("1000")),
      },
      {
        secretKey: process.env.PRIV_KEY_TEST4,
        balance: ethers.utils.hexlify(ethers.utils.parseEther("10000")),
      },
      {
        secretKey: process.env.PRIV_KEY_TEST5,
        balance: ethers.utils.hexlify(ethers.utils.parseEther("100000")),
      },
    ],
  });

  const serverListen = async () => {
    await new Promise((resolve, reject) => {
      server.listen(process.env.PORT, () => {
        console.log(`Forked off of node: ${mainetURL}\n`);
        console.log(`Test private key:\n`);
        console.log(`\t${process.env.PRIV_KEY_DEPLOY}`);
        console.log(`\t${process.env.PRIV_KEY_TEST1}`);
        console.log(`\t${process.env.PRIV_KEY_TEST2}`);
        console.log(`\t${process.env.PRIV_KEY_TEST3}`);
        console.log(`\t${process.env.PRIV_KEY_TEST4}`);
        console.log(`\t${process.env.PRIV_KEY_TEST5}`);
        console.log(`\nTest mainnet chain started on port ${process.env.PORT}, listening...`);
        resolve();
      });
    });
  };

  const serverClose = async () => {
    await new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) {
          reject(err);
        } else {
          console.log("test-mainnet chain stopped");
          resolve();
        }
      });
    });
  };
  // await serverListen();

  return { serverListen, serverClose }; 
}; 

const forkChainCMD = async () => {
  await new Promise((resolve) => {
    // npx ganache-cli -f https://mainnet.infura.io/v3/30b7709884d246a681aed71a33438f50 -i 1 -e 100000 -d
    const p = spawn('npx', ['ganache-cli','-f',mainetURL,'-i',1,'-e',100000,'-p',process.env.PORT,'-d'], { stdio: "inherit" });
    p.on("exit", () => resolve());
  });
};

const runTest = async () => {
  const { serverListen, serverClose } = await forkChain();
  await serverListen();
  await new Promise((resolve) => {
    const p = spawn('npx', ['node','scripts/test.js'], { stdio: "inherit" });
    p.on("exit", () => resolve());
  });
  await serverClose();
};
module.exports = {
  forkChain,
  forkChainCMD,
  fromWei,
  getTestFiles,
  increaseTime,
  mineBlock,
  runTest,
};
