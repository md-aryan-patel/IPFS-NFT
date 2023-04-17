import di from "../di/mainModule.mjs";
import ipfs from "./ipfsRepository.mjs";

const wallet = di.Wallet.getWallet();
const contract = di.Token.getContract();

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

export default { getTokenURI, getDetail, mintNft, addMetadata };
