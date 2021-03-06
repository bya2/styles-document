const process = require("process");
const os = require("os");
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = (env, options) => {
  const is_prod = env.mode === "production";
  const is_dev = !is_prod;
  const entry_path__mode = "./src/index.tsx";

  return {
    mode: env.mode,

    entry: entry_path__mode,

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      // filename: "assets/js/[name].[contenthash:8].js",
      publicPath: "/",
      clean: true,
    },

    resolve: {
      extensions: [".json", ".ts", ".tsx", ".js", ".jsx"],
      modules: [path.resolve(__dirname, "./src"), "node_modules"],
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@api": path.resolve(__dirname, "src/api"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@components": path.resolve(__dirname, "src/components"),
        "@config": path.resolve(__dirname, "src/config"),
        "@models": path.resolve(__dirname, "src/models"),
        "@store": path.resolve(__dirname, "src/store"),
        "@styles": path.resolve(__dirname, "src/styles"),
        "@styles-layouts": path.resolve(__dirname, "src/styles/layouts"),
        "@styles-components": path.resolve(__dirname, "src/styles/components"),
      },
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
      open: true,
      compress: true,
      historyApiFallback: true,
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-react"],
                cacheDirectory: true,
                cacheCompression: false,
                plugins: [is_dev && require.resolve("react-refresh/babel")].filter(Boolean),
              },
            },
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: is_dev ? "style-loader" : MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
              },
            },
            "resolve-url-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                additionalData: `
                  @import "@styles/abstracts/__abstracts-dir.scss";
                  @import "@styles/base/__base-dir.scss";
                  @import "@styles/layouts/__layouts-dir.scss";
                `,
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192,
                name: "assets/images/[name].[hash:8].[ext]",
              },
            },
          ],
        },
        {
          test: /\.svg$/i,
          use: ["@svgr/webpack"],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          use: {
            loader: "file-loader",
            options: {
              name: "assets/fonts/[name].[hash:8].[ext]",
            },
          },
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
        filename: "index.html",
        inject: true,
      }),
      new MiniCssExtractPlugin({
        filename: "./styles/[name].[contenthash].css",
      }),
      new ForkTsCheckerWebpackPlugin(),
      new webpack.EnvironmentPlugin({
        NODE_ENV: env.mode,
      }),
      new webpack.ProgressPlugin(),
      new webpack.ProvidePlugin({
        React: "react",
      }),
      new CleanWebpackPlugin({
        dry: true,
        verbose: true,
        cleanOnceBeforeBuildPatterns: ["**/*", path.resolve(process.cwd(), "build/**/*")],
      }),
      new ReactRefreshPlugin(),
    ],

    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin({
          parallel: os.cpus().length - 1,
        }),
      ],
      splitChunks: {
        chunks: "async",
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
  };
};
