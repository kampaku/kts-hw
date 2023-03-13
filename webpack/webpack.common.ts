import type { Configuration } from "webpack";

import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import paths from "./paths";

export const getSettingsForStyles = (withModules = false, isProd = false) => {
  return [
    MiniCssExtractPlugin.loader,
    !withModules
      ? "css-loader"
      : {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: !isProd
                ? "[path][name]__[local]"
                : "[hash:base64]",
            },
          },
        },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["autoprefixer"],
        },
      },
    },
    "sass-loader",
  ];
};

const config: Configuration = {
  entry: [paths.src + "/index.tsx"],

  output: {
    path: paths.build,
    clean: true,
    filename: "[name].bundle.js",
    publicPath: "/",
  },

  plugins: [
    new HtmlWebpackPlugin({
      favicon: paths.public + "/favicon.svg",
      inject: "body",
      template: paths.public + "/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[hash].css",
    }),
  ],

  module: {
    rules: [
      { test: /\.(j|t)sx?$/, exclude: /node_modules/, use: ["babel-loader"] },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[hash][ext]",
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext]",
        },
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
    alias: {
      "@components": paths.src + "/components",
      "@config": paths.src + "/config",
      "@styles": paths.src + "/styles",
      "@utils": paths.src + "/utils",
      "@store": paths.src + "/store",
    },
  },
};

export default config;
