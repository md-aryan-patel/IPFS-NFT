require("@nomicfoundation/hardhat-toolbox");
require("solidity-coverage");
require("dotenv").config();

module.exports = {
  solidity: "0.8.9",

  defaultNetwork: "network",

  networks: {
    network: {
      url: process.env.SEPOLIA_INFURA_ENDPOINT,
      accounts: [process.env.private_key],
    },
  },
};
