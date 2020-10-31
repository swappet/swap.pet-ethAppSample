// SPDX-License-Identifier: Apache-2.0
// Copyright 2020 Swap.Pet@pm.me
// scripts/test.js 
const fs = require('fs');
var inquirer = require('inquirer');
const { spawn } = require('child_process');

const testDir = 'test/';
getFiles = async (path) => {
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
main = async () => {
    const files = await getFiles(testDir);

    inquirer.prompt([
        {
            type: 'list',
            name: 'step1',
            message: 'select test tasks',
            choices: files,
        }
    ])
        .then(answers => {
            let argv=["mocha","--exit","--recursive","--bail"];
            let note="mocha --exit --recursive --bail ";
            if(answers.step1 !== 'all'){
                console.log(note + testDir + answers.step1);
                argv.push(testDir + answers.step1); 
            }else{ 
                console.log(note);
            }
            spawn("npx",argv, {
                stdio: 'inherit',
                shell: true
            });

        });
}

main();
