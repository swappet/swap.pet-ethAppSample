// SPDX-License-Identifier: Apache-2.0
// Copyright 2020 Swap.Pet@pm.me
// scripts/forktest.js 
const ganache = require("ganache-core");
const { spawn } = require("child_process");
require('@nomiclabs/hardhat-truffle5'); 
require("@nomiclabs/hardhat-web3");

const forkedChain = () => {
  const PORT = 8545;
  const server = ganache.server({
    port: PORT,
    fork: process.env.MAINNET_NODE_URL,
    network_id: 1,
    accounts: [
      {
        secretKey: process.env.PRIV_KEY_TEST,
        balance: ethers.utils.hexlify(ethers.utils.parseEther("1000")),
      },
      {
        secretKey: process.env.PRIV_KEY_DEPLOY,
        balance: ethers.utils.hexlify(ethers.utils.parseEther("1000")),
      },
    ],
  });

  const start = async () => {
    await new Promise((resolve, reject) => {
      server.listen(PORT, () => {
        console.log(`Forked off of node: ${process.env.MAINNET_NODE_URL}\n`);
        console.log(`Test private key:\n`);
        console.log(`\t${process.env.PRIV_KEY_TEST}`);
        console.log(`\nTest chain started on port ${PORT}, listening...`);
        resolve();
      });
    });
  };

  const stop = async () => {
    await new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) {
          reject(err);
        } else {
          console.log("test-chain stopped");
          resolve();
        }
      });
    });
  };

  return { start, stop };
};

const runTests = async () => {
  await new Promise((resolve) => {
    const p = spawn("npx", ["hardhat","test"], { stdio: "inherit" });
    p.on("exit", () => resolve());
  });
};

module.exports = {
  forkedChain,
  runTests,
};
