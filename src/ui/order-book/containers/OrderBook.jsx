import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderBookContent from "../components/OrderBook";

const OrderBook = () => {
  const [loading, setLoading] = useState(false);
  const [orderBook, setOrderBook] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = "/api/full-order-book";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await axios.get(apiUrl);
        setOrderBook(data.data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || (!orderBook.bids && !orderBook.asks)) {
    return (
      <div>
        Uh oh... something went wrong!
        <div>{error || "Couldn't load order book"}</div>
      </div>
    );
  }

  return <OrderBookContent orderBook={orderBook} />;
};

export default OrderBook;
