import type { Configuration as WebpackConfiguration } from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { merge } from "webpack-merge";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');

import { getSettingsForStyles } from "./webpack.common";
import common from "./webpack.common";

interface Configuration extends WebpackConfiguration {
  devServer?: DevServerConfiguration;
}

const devConfig: Configuration = merge(common, {
  mode: "development",
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },

  devtool: "eval-source-map",

  devServer: {
    allowedHosts: "all",
    host: "0.0.0.0",
    historyApiFallback: true,
    open: "http://localhost:3000/",
    compress: true,
    port: 3000,
    hot: true,
    client: {
      overlay: true,
    },
  },

  module: {
    rules: [
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: ["react-refresh/babel"],
            },
          },
        ],
      },
    ],
  },

  plugins: [new ReactRefreshWebpackPlugin(), new TsCheckerPlugin()],
});

export default devConfig;
