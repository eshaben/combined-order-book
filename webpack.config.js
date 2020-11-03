const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const outputDirectory = "dist";

module.exports = {
  entry: ["babel-polyfill", "./src/ui/index.js"], // babel-polyfill for async/await support
  output: {
    path: path.join(__dirname, outputDirectory), // target dist directory for bundled output
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // transforms jsx to js
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // load and bundle any css files
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, // load and bundle fonts and images
        loader: "url-loader?limit=100000",
      },
    ],
  },
  devServer: {
    // config to run development server
    port: 3000,
    open: true, // automatically open home page on start up
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]), // removes build folders before building
    new HtmlWebpackPlugin({
      // generates html files to serve webpack
      template: "./public/index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
