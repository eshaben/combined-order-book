import express from "express";
import axios from "axios";
import { merge } from "./utils/merge";

const router = express.Router();

interface IParams {
  req: express.Request;
  res: express.Response;
  next: express.NextFunction;
}

router.get("/", async ({ req, res, next }: IParams) => {
  const bittrexOrderBook = await axios.get(
    "https://api.bittrex.com/v3/markets/ETH-BTC/orderbook"
  );
  const poloniexOrderBook = await axios.get(
    "https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH&depth=25"
  );

  const combinedBids = merge(
    bittrexOrderBook.data.bid,
    poloniexOrderBook.data.bids,
    "bid"
  );

  const combinedAsks = merge(
    bittrexOrderBook.data.ask,
    poloniexOrderBook.data.asks,
    "ask"
  );

  res.send({ bids: combinedBids, asks: combinedAsks });
});

export default router;
