const { merge } = require("webpack-merge");
const path = require("path");

const config = require("./webpack.config.common");

module.exports = merge(config, {
  mode: "development",

  devtool: "",

  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true,
  },

  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js",
  },
});
