const express = require("express");

const app = express();

app.use(express.static("dist")); // serve static file from dist directory
app.get("/api/test", (req, res) => res.send("hello world"));

app.listen(process.env.PORT || 8000, () =>
  console.log(`Listening on port ${process.env.PORT || 8000}!`)
);
