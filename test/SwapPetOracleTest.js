// SPDX-License-Identifier: Apache-2.0
// Copyright 2020 Swap.Pet@pm.me
const { expect } = require("chai") 
const { BN, expectRevert } = require('@openzeppelin/test-helpers')
const assert = require('assert');
const { contract, accounts,web3 } = require('@openzeppelin/test-environment'); 

const SwapPetOracle = contract.fromArtifact('SwapPetOracle') 
 
//  Mocha test.
describe("SwapPetOracle contract", function() { 
  const [deployer, user1, user2, user3] = accounts 
  describe('SwapPetOracle change swapper', async () => { 
    beforeEach(async () => {
      this.spOracle = await SwapPetOracle.new(user1,user2,{ from: deployer })
    })
    it('init swapper', async () => { 
      expect(await this.spOracle.swapper()).to.equal(user2) 
    })  
    it('Should return the new swapper once its changed', async () => {
      await this.spOracle.setSwapper(user3)
      expect(await this.spOracle.swapper()).to.equal(user3) 
    })  
    it('Should return price', async () => {   
      assert.equal('10', await this.spOracle.price(user1,user2)) 
    })   
  }) 
});
