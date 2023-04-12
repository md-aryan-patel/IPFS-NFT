import "dotenv/config";
import abi from "../artifacts/contracts/MyToken.sol/MyToken.json" assert { type: "json" };
import { ethers } from "ethers";
import ipfs from "./ipfsRepository.mjs";

const url = process.env.SEPOLIA_INFURA_ENDPOINT;

const provider = new ethers.providers.JsonRpcProvider(url);
const wallet = new ethers.Wallet(process.env.private_key, provider);
const contract = new ethers.Contract(process.env.TOKEN, abi.abi, provider);

contract.on("Transfer", (to, amount, from) => {
  console.log("to: ", to, "\namount: ", amount, "\nfrom: ", from);
});

const mintNft = async (_tokenId) => {
  if ((await ipfs.checkIfIdExist(_tokenId)) != 0) {
    try {
      await contract.connect(wallet).safeMint(_tokenId.toString());
      return true;
    } catch (err) {
      console.error(err);
    }
  }
  return false;
};

const addMetadata = async (_name, _description, _attribute, ID, imageId) => {
  const cid = await ipfs.getImageCID(imageId);
  const img = process.env.IPFS_BASE + cid;
  const object = {
    name: _name,
    description: _description,
    image: img.toString(),
    attributes: _attribute,
  };
  await ipfs.postData(object, ID);
  return ID;
};

const getTokenURI = async (_tokenID) => {
  return await contract.tokenURI(_tokenID);
};

const getDetail = async () => {
  console.log(await contract.name());
};

const main = async () => {
  addMetadata("The pale city", "No one lives there", [], 1905, 6);
  mintNft(1900);
};

main();

export default { getTokenURI, getDetail };
