import React from "react";
import styled from "styled-components";

const Header = styled.div`
  font-size: 3rem;
`;

const OrderBook = (orderBook: any) => {
  return (
    <>
      <Header>Combined Order Book: BTH_ETC</Header>
      <div>{orderBook}</div>
    </>
  );
};

export default OrderBook;
