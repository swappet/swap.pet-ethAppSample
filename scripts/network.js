// SPDX-License-Identifier: Apache-2.0
// Copyright 2020 Swap.Pet@pm.me
// scripts/network.js 
const fs = require('fs');
var inquirer = require('inquirer');
const { spawn } = require('child_process');
const bip39 = require('bip39');

writeFile = (filename, data) => {
    fs.writeFile(filename, new Uint8Array(Buffer.from(data)), (err) => {
        if (err) throw err;
    });
}
nonCN = (word) => {
    var regex = new RegExp('^([a-z]{0,200})$')
    return regex.test(word.replace(/ /g, ''))
}
checkMnemonic = (words) => {
    if (words !== '') {
        if (nonCN(words)) {
            return bip39.validateMnemonic(words, bip39.wordlists.EN)
        } else {
            return bip39.validateMnemonic(words.replace(/ /g, '').split('').join(' '), bip39.wordlists.chinese_simplified)
        }
    } else {
        return false
    }
}
main = async () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'network',
            message: 'select network :',
            choices: [
                {
                    name: "ganache cli test env",
                    value: "ganache"
                },
                {
                    name: "truffle develop",
                    value: "develop"
                },
                {
                    name: "Ropsten test network",
                    value: "ropsten"
                },
                {
                    name: "Rinkeby test network",
                    value: "rinkeby"
                },
                {
                    name: "Kovan test network",
                    value: "kovan"
                },
                {
                    name: "etherum mainnet",
                    value: "mainnet"
                },
            ],
        },
        {
            type: 'input',
            name: 'mnemonic',
            message: 'for open local wallet :',
            when: (answers) => {
                return answers.network === "ropsten" ||
                    answers.network === "rinkeby" ||
                    answers.network === "kovan" ||
                    answers.network === "mainnet";
            },
            validate: (value) => {
                var pass = checkMnemonic(value);
                if (pass) {
                    return true;
                }
                return 'mnemonic is error!';
            }
        },
        {
            type: 'input',
            name: 'infura',
            message: 'input Infura Key(apply from:https://infura.io) :',
            when: function (answers) {
                return answers.mnemonic;
            }
        }
    ])
        .then(answers => {
            if (answers.network === "ganache") {
                console.log("ganache-cli -e 10000");
                argv = ["-e", "10000"];
                spawn('ganache-cli', argv, {
                    stdio: 'inherit',
                    shell: true
                });
            } else if (answers.network === "develop") {
                console.log("truffle develop");
                argv = ['develop'];
                spawn('truffle', argv, {
                    stdio: 'inherit',
                    shell: true
                });
            } else {
                writeFile('.mnemonic', answers.mnemonic);
                writeFile('.infuraKey', answers.infura);
                console.log("truffle console --network " + answers.network);
                argv = ["console", "--network", answers.network];
                spawn('truffle', argv, {
                    stdio: 'inherit',
                    shell: true
                });
            }
        });
}

main();