import { CID, create } from "ipfs-http-client";
import "dotenv/config";

const ipfs = create("http://127.0.0.1:5001");

const postData = async (_file, _id) => {
  let result;
  try {
    result = await ipfs.files.write(`/metadata/${_id}`, JSON.stringify(_file), {
      create: true,
    });
  } catch (err) {
    console.error(err);
  }
  return result;
};

const getImageCID = async (_id) => {
  let result;
  try {
    result = ipfs.files.ls("/Images");
    for await (const item of result) {
      if (item.name === `${_id}.jpg`) return item.cid.toString();
    }
  } catch (err) {
    console.error(err);
  }
};

const removeData = async (_cid) => {
  const result = await ipfs.pin.rm(CID.parse(_cid));
  return result;
};

const checkIfIdExist = async (_tokenID) => {
  const result = ipfs.files.ls("/metadata");
  for await (const file of result) {
    if (file.name == _tokenID) return _tokenID;
  }
  return 0;
};

export default { postData, removeData, getImageCID, checkIfIdExist };
