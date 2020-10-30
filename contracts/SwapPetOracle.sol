// SPDX-License-Identifier: Apache-2.0
// Copyright 2020 Swap.Pet@pm.me
// contracts/SwapPetOracle.sol
pragma solidity ^0.7.0; 

// import "@nomiclabs/buidler/console.sol";
import "hardhat/console.sol";

/// @title   basic price Oracle of Swap.Pet.
/// @author  Swap.Pet@pm.me 
/// @dev     price on base/quote, swapper for exchange between base and quote. 
contract SwapPetOracle { 
    address public oracle;
    address public swapper;

    constructor(address oracle_,address swapper_) public {
        console.log("Deploying a Oracle with swapper:", swapper_);
        oracle = oracle_;
        swapper = swapper_;
    } 

    function setSwapper(address swapper_) public {
        console.log("Changing swapper from '%s' to '%s'", swapper, swapper_);
        swapper = swapper_;
    }
    /// @notice the price(scaled by 1e18) of base_/quote_.
    // / @returns return 0 if false or not support the base_/quote_. 
    function price(address base_,address quote_) external view returns (uint256){
        console.log("price of '%s' / '%s':'%i'", base_, quote_,10);
        return 10;
    }

    /// @notice swap Check amountIn_ tokenIn_ to amountOut_ tokenOut_.
    // / @returns 0 with do nothing or do not support base_/quote_ swap.
    function swap(address tokenIn_,address tokenOut_,uint256 amountIn_) external returns (uint256 amountOut_){
        amountOut_ = 123;
        console.log("swap '%s' from '%i' to '%i'", tokenIn_, amountIn_, amountOut_); 
        return 123;
    }
}
