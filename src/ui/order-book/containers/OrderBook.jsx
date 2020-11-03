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
        console.log(data.data);
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

  if (error) {
    return (
      <div>
        Uh oh... something went wrong!
        <div>{error}</div>
      </div>
    );
  }

  return <OrderBookContent orderBook={orderBook} />;
};

export default OrderBook;
