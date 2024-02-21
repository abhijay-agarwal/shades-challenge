import express from "express";
import cors from "cors";
import {
  getAllTiles,
  getById,
  getFromQuery,
  getOneTest,
  getStrictImageMatches,
  getStrictestMatches,
} from "./sanityServer.js";
import { setLiked, getLiked, delLiked, getAllLiked } from "./vercelServer.js";

const server_port = 8080;
const server_host = "localhost";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

// server landing page
app.get("/", (req, res) => {
  res.json("Hello World");
});

// useful routes for debugging
app.get("/test", getOneTest);
app.get("/all", getAllTiles);

// routes for querying Sanity
app.get("/search/:queryString", getFromQuery);
app.get("/search/strict/:queryString", getStrictImageMatches);
app.get("/search/strictest/:queryString", getStrictestMatches);

// routes for vercel KV store updates
app.get("/get/:id", getLiked);
app.put("/set/:id", setLiked);
app.delete("/del/:id", delLiked);

// route to display items
app.get("/id/:id", getById);
app.get("/liked", getAllLiked);

app.listen(server_port, () => {
  console.log(
    `Server running`
  );
});

export default app;
