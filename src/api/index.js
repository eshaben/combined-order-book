const express = require("express");
const orderBook = require("./routes/order-book");

const app = express();

app.use(express.static("dist")); // serve static file from dist directory
app.use("/", orderBook);
/* eslint-disable func-names */
app.listen(process.env.PORT || 8000, function () {
  console.log(`Listening on port ${process.env.PORT || 8000}!`);
});
