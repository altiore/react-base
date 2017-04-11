'use strict';

const { join, resolve } = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('../webpack.config');

const app = express();
const compiler = webpack(config);
const PORT = process.env.PORT || 8018;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(PORT, 'localhost', err => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Listening at http://localhost:${PORT}`)
});