import express from 'express';
import bittrexRouter from "./routes/bittrex";

const app = express();
const PORT = 8000;

app.use("/", bittrexRouter);
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});