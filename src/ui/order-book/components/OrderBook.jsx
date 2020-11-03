import React from "react";
import styled from "styled-components";

const Header = styled.div`
  font-size: 3rem;
`;

const OrderBook = (orderBook) => {
  console.log(orderBook);
  return (
    <>
      <Header>Combined Order Book: BTH_ETC</Header>
    </>
  );
};

export default OrderBook;
