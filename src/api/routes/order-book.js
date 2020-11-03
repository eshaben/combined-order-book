const express = require("express");
const axios = require("axios");
const merge = require("./utils/merge");

const router = express.Router();

router.get("/", async (_req, res) => {
  const bittrexOrderBook = await axios.get("https://api.bittrex.com/v3/markets/ETH-BTC/orderbook");
  const poloniexOrderBook = await axios.get(
    "https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH&depth=25"
  );

  const combinedBids = merge(bittrexOrderBook.data.bid, poloniexOrderBook.data.bids, "bid");

  const combinedAsks = merge(bittrexOrderBook.data.ask, poloniexOrderBook.data.asks, "ask");

  res.send({ bids: combinedBids, asks: combinedAsks });
});

module.exports = router;
