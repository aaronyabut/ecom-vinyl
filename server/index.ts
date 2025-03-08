import express, { Request, Response} from 'express';
require('dotenv').config();
const pool = require('../database/db');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// Test endpoint
app.get('/test', async (req: Request, res: Response) => {
  res.json({ message: 'Message from Express!' });
});

// RESTful API: Fetch vinyls from Postgres
// app.get('/api/vinyls', async (req: Request, res: Response) => {
//   try {
//     const { rows } = await pool.query('SELECT * FROM vinyls');
//     res.json(rows);
//   } catch (error) {
//     console.error('Error fetching vinyls:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

app.listen(port, () => {
  console.log(`[server] Server is running at http://localhost:${port}`);
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