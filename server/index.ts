import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config()
const app = express();
const port = process.env.PORT || 4000;

// This enables for cross-origin requests
app.use(cors());

// This enables API to handle JSON data in POST/PUT requests
app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`[server] Server is running at http://localhost:${port}`);
});

/*
Table example
{
  product_id: 1,
  vinyl_img: "",
  product_href: "",
  vinyl_title: "",
  vinyl_artist: "",
  price: "",
  old_price: "",
  sale_label: "",
  low_stock_label: "",
  genre: "",
  vinyl_description: ""
}
*/