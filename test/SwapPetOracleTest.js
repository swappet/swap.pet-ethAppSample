// SPDX-License-Identifier: Apache-2.0
// Copyright 2020 Swap.Pet@pm.me
// test/SwapPetOracleTest.js 
const { expect } = require("chai")
const assert = require('assert');
const { BN, expectRevert } = require('@openzeppelin/test-helpers')

// Traditional Truffle test
const SwapPetOracle = artifacts.require('SwapPetOracle') 
contract('SwapPetOracle', (accounts) => {
  const [deployer, user1, user2, user3] = accounts
  let spOracle

  beforeEach(async () => {
    spOracle = await SwapPetOracle.new(user1,user2,{ from: deployer })
  })

  describe('SwapPetOracle change swapper', async () => { 
    it('init swapper', async () => { 
        expect(await spOracle.swapper()).to.equal(user2) 
    })  
    it('Should return the new swapper once its changed', async () => {  
        await spOracle.setSwapper(user3)
        expect(await spOracle.swapper()).to.equal(user3) 
    })  
    it('Should return price', async () => {   
         assert.equal('10', await spOracle.price(user1,user2)) 
    })   
  })
}) 