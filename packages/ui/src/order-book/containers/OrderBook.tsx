import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderBookContent from "../components/OrderBook";

interface IReturnData {
  quantity: string;
  price: string;
  exchanges: string[];
}

const OrderBook = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [orderBook, setOrderBook] = useState<any>([]);
  const [error, setError] = useState<Error | null>(null);

  const apiUrl = "https://localhost:8000/full-order-book";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await axios.get(apiUrl);
        setOrderBook(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    fetchData();
  });

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

  return <OrderBookContent orderBook={orderBook.data} />;
};

export default OrderBook;
