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
    index: resolve(__dirname, '..', 'src', 'index.js'),
    background: resolve(PATH.BACKGROUND, 'background.js'),
    content: resolve(PATH.CONTENT, 'content.js'),
    popup: resolve(PATH.POPUP, 'popup.js'),
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
      // {
      //   test: /\.hbs$/,
      //   use: [
      //     {
      //       loader: 'handlebars-loader',
      //       options: {
      //         runtime: 'handlebars/runtime',
      //         helperDirs: [],
      //         partialDirs: [
      //           resolve(__dirname, '..', 'src', 'templates', 'partials'),
      //         ],
      //       },
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new htmlWebpackPlugin({
      template: resolve(SRC_PATH, 'index.html'),
      filename: resolve(__dirname, '..', 'dist', 'index.html')
    }),
  ],
};