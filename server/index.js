import express from "express";
import cors from "cors";
import { getAllTiles, getById, getBySearchTerm } from "./sanityServer.js";
import { setLiked, getLiked, delLiked } from "./vercelServer.js";

const server_port = 8080;
const server_host = "localhost";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://shades-challenge-zko8.vercel.app'); // Specific origin
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.get("/", (req, res) => {
  res.json("Hello World!");
});
app.get("/count", getAllTiles);
app.get("/id/:id", getById);
app.get("/search/:searchTerm", getBySearchTerm);
app.get("/get/:id", getLiked);
app.put("/set/:id", setLiked);
app.delete("/del/:id", delLiked);

app.listen(server_port, () => {
  console.log(
    `Server running`
  );
});

export default app;
