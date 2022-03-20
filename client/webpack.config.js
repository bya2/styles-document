// const process = require("process");
const path = require("path");

const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const dotenv = require("dotenv");

module.exports = (env, option) => {
  const is_prod__mode = env.mode === "production";

  dotenv.config({
    path: path.resolve(__dirname, is_prod__mode ? ".env" : ".env"),
  });

  let entry_path__mode = is_prod__mode ? "./src/index.tsx" : "./src/index.tsx";

  return {
    mode: env.mode,

    entry: entry_path__mode,

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      clean: true,
    },

    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      modules: [path.resolve(__dirname, "./src"), "node_modules"],
    },

    devServer: {
      hot: true,
      host: "127.0.0.1",
      port: "3003",
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
      },
      proxy: {
        "/api": "http://localhost:8080",
      },
    },

    module: {
      rules: [
        // {
        //   test: /\.tsx?$/,
        //   exclude: /node_modules/,
        //   use: ["babel-loader", "ts-loader"],
        // },
        // {
        //   test: /\.jsx?$/,
        //   exclude: /node_modules/,
        //   loader: ["babel-loader", "source-map-loader"],
        // },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
              },
            },
            {
              loader: "esbuild-loader",
              options: {
                loader: "tsx",
                target: "es2015",
              },
            },
          ],
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ["esbuild-loader"],
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            "css-loader",
            "sass-loader",
          ],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
        filename: "index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "./styles/[name].[contenthash].css",
      }),
      new ForkTsCheckerWebpackPlugin(),
      new webpack.ProgressPlugin(),
      new webpack.ProvidePlugin({
        React: "react",
      }),
      new CleanWebpackPlugin(),
    ],
  };
};
