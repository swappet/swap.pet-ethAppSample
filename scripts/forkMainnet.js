// SPDX-License-Identifier: Apache-2.0
// Copyright 2020 Swap.Pet@pm.me
// scripts/forkMainnet.js
const { forkChain } = require("./utils");

const forkMainnet = async () => {
  const { serverListen, serverClose } = await forkChain();
  await serverListen(); 
};
forkMainnet(); 