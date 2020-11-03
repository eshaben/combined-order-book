function formatData(data, exchanges) {
  // since we can accept two different types for this fn, we can
  // use the in operator to narrow down the correct type of data
  if ("quantity" in data && "rate" in data) {
    return { quantity: data.quantity, price: data.rate, exchanges };
  }
  return { quantity: data[1].toString(), price: data[0], exchanges };
}

function merge(bittrexData, poloniexData, type) {
  const merged = [];
  let bittrexIndex = 0;
  let poloniexIndex = 0;

  while (bittrexIndex < bittrexData.length && poloniexIndex < poloniexData.length) {
    const unmergedBittrex = bittrexData[bittrexIndex];
    const unmergedPoloniex = poloniexData[poloniexIndex];

    // if the type is ask, we want the order of asks sorted by rate from low to high
    let shouldAddBittrexData = unmergedBittrex.rate < unmergedPoloniex[0];
    if (type === "bid") {
      // if the type is bid, we want the order of bids sorted by rate from high to low
      shouldAddBittrexData = unmergedBittrex.rate > unmergedPoloniex[0];
    }

    if (shouldAddBittrexData) {
      const formattedData = formatData(unmergedBittrex, ["bittrex"]);
      merged.push(formattedData);
      bittrexIndex += 1;
    } else if (unmergedBittrex.rate === unmergedPoloniex[0]) {
      // quantity from bittrex is in a string, let's turn it into a number
      // so we can add the quantities
      const bittrexQuantity = parseFloat(unmergedBittrex.quantity);
      const poloniexQuantity = unmergedPoloniex[1];
      const dataWithCombinedTotal = bittrexQuantity + poloniexQuantity;

      const combinedData = [unmergedPoloniex[0], dataWithCombinedTotal];

      const formattedData = formatData(combinedData, ["bittrex", "poloniex"]);
      merged.push(formattedData);
      bittrexIndex += 1;
      poloniexIndex += 1;
    } else {
      const formattedData = formatData(unmergedPoloniex, ["poloniex"]);
      merged.push(formattedData);
      poloniexIndex += 1;
    }
  }

  return merged;
}

module.exports = merge;
