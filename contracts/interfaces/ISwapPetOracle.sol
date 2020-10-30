// SPDX-License-Identifier: Apache-2.0
// Copyright 2020 Swap.Pet@pm.me
// contracts/interfaces/ISwapPetOracle.sol
pragma solidity ^0.7.0;

/// @title   Interface for interacting with price Oracle of Swap.Pet.
/// @author  Swap.Pet@pm.me 
/// @dev     price on base/quote, swaper for exchange between base and quote. 
interface ISwapPetOracle { 
    /// @notice the price(scaled by 1e18) of base_/quote_.
    // / @returns return 0 if false or not support the base_/quote_. 
    function price(address base_,address quote_) external view returns (uint256);

    /// @notice swap Check amountIn_ tokenIn_ to amountOut_ tokenOut_.
    // / @returns 0 with do nothing or do not support base_/quote_ swap.
    function swap(address tokenIn_,address tokenOut_,uint256 amountIn_) external returns (uint256 amountOut_);
}