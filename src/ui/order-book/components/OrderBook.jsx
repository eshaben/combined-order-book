import React from "react";
import styled from "styled-components";

const Header = styled.div`
  font-size: 3rem;
`;

const TablesWrapper = styled.div`
  display: flex;
`;

const OrderBook = (orderBook) => {
  const { bids, asks } = orderBook.orderBook;
  return (
    <>
      <Header>Combined Order Book: BTH_ETC</Header>
      <TablesWrapper>
        <table>
          <thead>
            <tr>
              <th>Exchanges</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid) => {
              return (
                <tr key={bid.price}>
                  <td>{bid.exchanges.join(",")}</td>
                  <td>{bid.quantity}</td>
                  <td>{bid.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>Price</th>
              <th>Quantity</th>
              <th>Exchanges</th>
            </tr>
          </thead>
          <tbody>
            {asks.map((ask) => {
              return (
                <tr key={ask.price}>
                  <td>{ask.price}</td>
                  <td>{ask.quantity}</td>
                  <td>{ask.exchanges.join(",")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TablesWrapper>
    </>
  );
};

export default OrderBook;
