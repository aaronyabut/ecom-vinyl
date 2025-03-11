import express from 'express';
require('dotenv').config();
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`[server] Server is running at http://localhost:${port}`);
});

/*
Table example
{
  vinyl_id: 1,
  image: "",
  href: "",
  title: "",
  artist: "",
  price: "",
  old_price: "",
  sale_label: "",
  low_stock: "",
  genre: "",
}
*/