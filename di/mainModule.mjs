import abi from "../artifacts/contracts/MyToken.sol/MyToken.json" assert { type: "json" };
import { ethers } from "ethers";
import "dotenv/config";

const url = process.env.RPC_URL;

const Wallet = (() => {
  let wallet;
  const createWallet = () => {
    wallet = new ethers.Wallet(process.env.private_key, Provider.getProvider());
    return wallet;
  };

  return {
    getWallet: () => {
      if (!wallet) wallet = createWallet();
      return wallet;
    },
  };
})();

const Provider = (() => {
  let provider;
  const createProvider = () => {
    provider = new ethers.providers.JsonRpcProvider(url);
    return provider;
  };

  return {
    getProvider: () => {
      if (!provider) provider = createProvider();
      return provider;
    },
  };
})();

const Token = (() => {
  let contract;
  const createContract = () => {
    contract = new ethers.Contract(
      process.env.TOKEN,
      abi.abi,
      Provider.getProvider()
    );
    return contract;
  };

  return {
    getContract: () => {
      if (!contract) {
        contract = createContract();
      }
      return contract;
    },
  };
})();

export default { Wallet, Token };
