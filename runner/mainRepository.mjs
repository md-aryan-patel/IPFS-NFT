import { ethers } from "ethers";
import ipfs from "./ipfsRepository.mjs";
import abi from "../artifacts/contracts/MyToken.sol/MyToken.json" assert { type: "json" };
import "dotenv/config";

const url = process.env.SEPOLIA_INFURA_ENDPOINT;

const provider = new ethers.providers.JsonRpcProvider(url);
const wallet = new ethers.Wallet(process.env.private_key, provider);
const contract = new ethers.Contract(process.env.TOKEN, abi.abi, provider);

contract.on("Transfer", (from, to, amount) => {
  console.log("from: ", from, "\nto: ", to, "\namount: ", amount);
});

const mintNft = async (_uid) => {
  if ((await ipfs.checkIfIdExist(_uid)) != 0) {
    try {
      await contract.connect(wallet).safeMint(_uid.toString());
      return true;
    } catch (err) {
      console.error(err);
    }
  }
  return false;
};

const addMetadata = async (_name, _description, _attribute, ID, imageId) => {
  const cid = await ipfs.getImageCID(imageId);
  const img = "ipfs://" + cid.toString();
  const name = `${_name} #${ID}`;
  const object = {
    name: name,
    description: _description,
    image: img,
    attributes: _attribute,
  };
  await ipfs.postData(object, ID);
  return ID;
};

const getTokenURI = async (_tokenID) => {
  const result = await contract.tokenURI(_tokenID);
  return result;
};

const getDetail = async () => {
  const result = await contract.name();
  return result;
};

export default { getTokenURI, getDetail, mintNft };
