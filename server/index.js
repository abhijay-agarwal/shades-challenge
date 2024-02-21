import express from "express";
import cors from "cors";
import { getAllTiles, getById, getBySearchTerm } from "./sanity.js";
import { setLike, getLike } from "./vercel.js";

const json = require("./config.json");

const server_port = json.server_port;
const server_host = json.server_host;

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json("Hello World!");
});
app.get("/count", getAllTiles);
app.get("/id/:id", getById);
app.get("/search/:searchTerm", getBySearchTerm);
app.get("/like/:id", getLike);
app.post("/like?id=&like=", setLike);

app.listen(server_port, () => {
  console.log(
    `Server running`
  );
});

export default app;
