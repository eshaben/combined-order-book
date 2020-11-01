import express from 'express';
const app = express();
const PORT = 8000;

app.get('/', (_req: express.Request, res: express.Response) => res.send('hello world'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});