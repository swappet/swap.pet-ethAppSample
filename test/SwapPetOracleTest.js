const { expect } = require("chai")
 
const SwapPetOracle = artifacts.require('SwapPetOracle') 
const { BN, expectRevert } = require('@openzeppelin/test-helpers')
const assert = require('assert');

// Traditional Truffle test
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
// Vanilla Mocha test. Increased compatibility with tools that integrate Mocha.
describe("SwapPetOracle contract", function() {
  let accounts,deployer, user1, user2, user3;

  before(async function() {
    accounts = await web3.eth.getAccounts();
    [deployer, user1, user2, user3] = accounts 
  });

  describe("Deployment", function() {
    it("Should deploy with the right SwapPetOracle", async function() {
      const spOracle = await SwapPetOracle.new(user1,user2,{ from: deployer });
      expect(await spOracle.swapper()).to.equal(user2) ;
    });
  });
});