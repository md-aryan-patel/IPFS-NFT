import Express from "express";
import route from "../routes/routes.mjs";
import cors from "cors";
import "dotenv/config";

const port = process.env.PORT || 3000;
const app = Express();

app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use("/", route.route);

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
