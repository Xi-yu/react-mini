const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "inline-source-map",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  devServer: {
    static: "./dist",
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./template.html"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        include: path.resolve(__dirname, "./src"),
      },
    ],
  },
};
