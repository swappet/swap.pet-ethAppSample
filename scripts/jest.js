// SPDX-License-Identifier: Apache-2.0
// Copyright 2020 Swap.Pet@pm.me
// scripts/jest.js 
const fs = require('fs');
const path = require('path'); 
require("dotenv").config();
var inquirer = require('inquirer');
const ganache = require("ganache-core");
const { spawn } = require("child_process"); 
const { ethers } = require("ethers")

//const infuraKey = fs.readFileSync(path.resolve(__dirname, '.infuraKey')).toString().trim(); 
const infuraKey = fs.readFileSync(path.resolve(__dirname, '../.infuraKey')).toString().trim(); 
const mainetURL = `https://mainnet.infura.io/v3/${infuraKey}`
const testDir = 'test/';

const forkChain = () => {
  const PORT = 8548;
  const server = ganache.server({
    port: PORT,
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
      server.listen(PORT, () => {
        console.log(`Forked off of node: ${mainetURL}\n`);
        console.log(`Test private key:\n`);
        console.log(`\t${process.env.PRIV_KEY_DEPLOY}`);
        console.log(`\t${process.env.PRIV_KEY_TEST1}`);
        console.log(`\t${process.env.PRIV_KEY_TEST2}`);
        console.log(`\t${process.env.PRIV_KEY_TEST3}`);
        console.log(`\t${process.env.PRIV_KEY_TEST4}`);
        console.log(`\t${process.env.PRIV_KEY_TEST5}`);
        console.log(`\nTest chain started on port ${PORT}, listening...`);
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
          console.log("test-chain stopped");
          resolve();
        }
      });
    });
  };

  return { serverListen, serverClose };
};

const runJest = async () => {
  const files = await getFiles(testDir);
  const answers = await inquirer.prompt([{
      type: 'list',
      name: 'step1',
      message: 'select test tasks',
      choices: files,
  }]);
  
  await new Promise((resolve) => {
    let argv=["jest"];
    let note="jest "; 
    if(answers.step1 !== 'all'){
        console.log(note + testDir + answers.step1);
        argv.push(testDir + answers.step1); 
    }else{ 
        console.log(note);
    } 
    const p = spawn("npx", argv, { stdio: "inherit",shell: true });
    p.on("exit", () => resolve());
  }); 
};
const getFiles = async (path) => {
  // getFiles = async (path) => {
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
module.exports = {
  forkChain,
  runJest,
  getFiles,
};
