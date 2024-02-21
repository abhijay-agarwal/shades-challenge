const express = require('express');
const cors = require('cors');
const config = require('./config');
const sanity = require('./sanity');


const app = express();
app.use(cors({
  origin: '*',
}));


app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/count', sanity.getAllTiles);
app.get('/:id', sanity.getById);
app.get('/search/:searchTerm', sanity.getBySearchTerm);

app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;
