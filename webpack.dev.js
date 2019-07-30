'use strict';
const path = require('path');
const configPlain = require('./webpack.config');

const config = {
  ...configPlain,
  mode: 'development',
  devtool: 'source-map',
  watch: true,
  stats: {
    colors: true
  },
  devServer: {
    contentBase: path.join(__dirname, 'assets'),
    compress: true,
    port: 3000,
  },
};

module.exports = config;
