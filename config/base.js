'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

const ROOT = resolve(__dirname, '..');

const SRC_PATH = resolve(ROOT, 'src');

const PATH = {
  BACKGROUND: resolve(SRC_PATH, 'background'),
  CONTENT: resolve(SRC_PATH, 'content'),
  POPUP: resolve(SRC_PATH, 'popup'),
};

module.exports = {
  entry: {
    background: resolve(PATH.BACKGROUND, 'background.tsx'),
    slack: resolve(PATH.CONTENT, 'slack', 'slack-util.tsx'),
    pullrequest: resolve(PATH.CONTENT, 'pullrequest', 'pullrequest-util.tsx'),
    floatingButton: resolve(PATH.CONTENT, 'floatingButton', 'floatingButton.tsx'),
    popup: resolve(PATH.POPUP, 'popup.tsx'),
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
    alias: {
      'background': resolve(SRC_PATH, 'background'),
      'content': resolve(SRC_PATH, 'content'),
      'popup': resolve(SRC_PATH, 'popup/components'),
      'util': resolve(SRC_PATH, 'util'),
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new htmlWebpackPlugin({
      template: resolve(SRC_PATH, 'popup', 'popup.html'),
      filename: resolve(__dirname, '..', 'dist', 'popup.html'),
      inject: false,
    }),
  ],
};