import express, { Request, Response} from 'express';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());


app.get("/test", async(req: Request, res: Response) => {
  res.json({ message: 'Message from express!' });
})

app.get('/api/vinyls', (req: Request, res: Response) => {
  const vinyls = [
    { id: 1, title: 'Dark Side of the Moon', artist: 'Pink Floyd', price: 29.99 },
    { id: 2, title: 'Abbey Road', artist: 'The Beatles', price: 34.99 }
  ];
  res.json(vinyls);
});

app.listen(port, () => {
  console.log(`[server] server is running at http://localhost:${port}`); // Fixed HTTPS to HTTP
});
/*

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