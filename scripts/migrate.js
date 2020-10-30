// SPDX-License-Identifier: Apache-2.0
// Copyright 2020 Swap.Pet@pm.me
// scripts/network.js 
const fs = require('fs');
var inquirer = require('inquirer');
const { spawn } = require('child_process');

const migrateDir = 'migrations/';
getFiles = async (path) => {
    const subDir = await fs.readdirSync(path, 'utf-8');
    let files = [{ name: 'deploy all', value: 'all' }];
    subDir.forEach((filename, index) => { 
        const _filename = filename.split("_");
        const num = _filename[0];
        files[num] = { name: filename, value: num };
    })
    return files;
}
main = async () => {
    const files = await getFiles(migrateDir);

    inquirer.prompt([
        {
            type: 'list',
            name: 'step1',
            message: 'select contract to deply',
            choices: files,
        }
    ])
        .then(answers => {
            let argv;
            if (answers.step1 !== 'all') {
                console.log("truffle migrate --f " + answers.step1 + " --to " + answers.step1);
                argv = ["migrate","--f", answers.step1,"--to",answers.step1];
            } else {
                argv = ["migrate","--reset"];
                console.log("truffle migrate ");
            }
            spawn("truffle", argv, {
                stdio: 'inherit',
                shell: true
            });

        });
}

main();