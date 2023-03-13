import type { Configuration } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { merge } from "webpack-merge";

import { getSettingsForStyles } from "./webpack.common";
import paths from "./paths";
import common from "./webpack.common";

const prodConfig: Configuration = merge(common, {
  mode: "production",
  devtool: "hidden-source-map",
  output: {
    path: paths.build,
    publicPath: "/",
    filename: "js/[name].[contenthash].bundle.js",
    chunkFilename: "js/[name].[contenthash].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true, true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(false, true),
      },
    ],
  },
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendors",
          test: /node_modules/,
          chunks: "all",
          enforce: true,
        },
      },
    },
    runtimeChunk: {
      name: "single",
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});

export default prodConfig;
