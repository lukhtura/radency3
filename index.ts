import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './routes/notes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(router);

app.get('/', (req: Request, res: Response) => {
  res.send('Notes API');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
