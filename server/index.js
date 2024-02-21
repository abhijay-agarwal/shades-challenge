import express from "express";
import cors from "cors";
import { server_port, server_host } from "./config";
import { getAllTiles, getById, getBySearchTerm } from "./sanity";
import { getLike } from "./vercel";

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

app.listen(server_port, () => {
  console.log(
    `Server running at http://${server_host}:${server_port}/`
  );
});

export default app;
