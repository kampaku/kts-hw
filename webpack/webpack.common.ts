import type { Configuration } from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';

import paths from './paths';

import webpack from "webpack";

const config: Configuration = {
  entry: [paths.src + '/index.tsx'],

  output: {
    path: paths.build,
    clean: true,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  plugins: [

    new HtmlWebpackPlugin({
      // favicon: paths.public + '/favicon.png',
      inject: 'body',
      template: paths.public + '/index.html',
      filename: 'index.html',
    })
  ],

  module: {
    rules: [
      { test: /\.(j|t)sx?$/, exclude: /node_modules/, use: ['babel-loader'] },

      {
        test: /\.svg$/,
        issuer: /\.(t|j)sx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.svg$/,
        issuer: /\.(scss|css)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash][ext]',
        },
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash][ext]',
        },
      },

      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    alias: {
      "@components/*": paths.src + "/components",
      "@config/*": paths.src + "/config",
      "@styles/*": paths.src + "/styles",
      "@utils/*": paths.src + "/utils",
      "@store/*": paths.src + "/store"
    },
  }
};

export default config;
