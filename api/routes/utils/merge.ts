interface IBittrexData {
  quantity: string;
  rate: string;
}

interface IReturnItem {
  quantity: string;
  price: string;
  exchanges: string[];
}

const formatData = (
  data: IBittrexData | [string, number],
  exchanges: string[]
): IReturnItem => {
  // since we can accept two different types for this fn, we can
  // use the in operator to narrow down the correct type of data
  if ("quantity" in data && "rate" in data) {
    return { quantity: data.quantity, price: data.rate, exchanges };
  } else {
    return { quantity: data[1].toString(), price: data[0], exchanges };
  }
};

export const merge = (
  bittrexData: IBittrexData[],
  poloniexData: [[string, number]],
  type: string
) => {
  let merged: IReturnItem[] = [];
  let bittrexIndex: number = 0;
  let poloniexIndex: number = 0;

  while (
    bittrexIndex < bittrexData.length &&
    poloniexIndex < poloniexData.length
  ) {
    let unmergedBittrex: IBittrexData = bittrexData[bittrexIndex];
    let unmergedPoloniex: [string, number] = poloniexData[poloniexIndex];

    // if the type is ask, we want the order of asks sorted by rate from low to high
    let shouldAddBittrexData: boolean =
      unmergedBittrex.rate < unmergedPoloniex[0];
    if (type === "bid") {
      // if the type is bid, we want the order of bids sorted by rate from high to low
      shouldAddBittrexData = unmergedBittrex.rate > unmergedPoloniex[0];
    }

    if (shouldAddBittrexData) {
      const formattedData: IReturnItem = formatData(unmergedBittrex, [
        "bittrex",
      ]);
      merged.push(formattedData);
      bittrexIndex += 1;
    } else if (unmergedBittrex.rate === unmergedPoloniex[0]) {
      // quantity from bittrex is in a string, let's turn it into a number
      // so we can add the quantities
      const bittrexQuantity: number = parseFloat(unmergedBittrex.quantity);
      const poloniexQuantity: number = unmergedPoloniex[1];
      const dataWithCombinedTotal: number = bittrexQuantity + poloniexQuantity;

      const combinedData: [string, number] = [
        unmergedPoloniex[0],
        dataWithCombinedTotal,
      ];

      const formattedData: IReturnItem = formatData(combinedData, [
        "bittrex",
        "poloniex",
      ]);
      merged.push(formattedData);
      bittrexIndex += 1;
      poloniexIndex += 1;
    } else {
      const formattedData: IReturnItem = formatData(unmergedPoloniex, [
        "poloniex",
      ]);
      merged.push(formattedData);
      poloniexIndex += 1;
    }
  }

  return merged;
};
