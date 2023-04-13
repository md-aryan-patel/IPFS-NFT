import { Router } from "express";
import repository from "./mainRepository.mjs";
import "dotenv/config";

const route = Router();

route.post("/mint/:id", async (req, res) => {
  const result = await repository.mintNft(req.params.id);
  res.send(result);
});

route.get("/geturi/:tokenid", async (req, res) => {
  const result = await repository.getTokenURI(req.params.tokenid);
  res.send(result);
});

route.get("/", async (req, res) => {
  const result = await repository.getDetail();
  res.send(result);
});

export default { route };
