import express, { Request, Response} from 'express';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.get("/test", async(req: Request, res: Response) => {
  res.json({ message: 'This is from express!' });
})
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`); // Fixed HTTPS to HTTP
});