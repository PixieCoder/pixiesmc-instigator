'use strict';
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// require("babel-register");

const config = {
  entry: {
    'js/main': './src/main.js',
  },

  mode: 'production',
  output: {
    path: path.resolve(__dirname, './dist'),

  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.tpl\.html$/,
        use: ['webpack-lodash-template-loader'],
      }
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './assets/index.html',
      filename: 'index.html',
      hash: true,
    }),
  ],
};

module.exports = config;
