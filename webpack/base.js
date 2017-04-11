'use strict';

const { resolve } = require('path');
const webpack = require('webpack');
const Package = require('../../package');

module.exports = {
  name: Package.name,
  context: resolve(__dirname, '..', '..', 'app'),
  target: 'web',
  output: {
    path: resolve(__dirname, '..', '..', 'admin'),
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[hash:8].chunk.js',
    publicPath: '/',
    pathinfo: true,
  },
  resolve: {
    extensions: ['.js', '.json', '.md', '.scss', '.css'],
    alias: {
      components: resolve(__dirname, '..', '..', 'app', 'components'),
      pages: resolve(__dirname, '..', '..', 'app', 'pages'),
      data: resolve(__dirname, '..', '..', 'app', 'data'),
      helpers: resolve(__dirname, '..', '..', 'app', 'helpers'),
      static: resolve(__dirname, '..', '..', 'static'),
      store: resolve(__dirname, '..', '..', 'app', 'store'),
      styles: resolve(__dirname, '..', '..', 'app', 'components', 'styles'),
    },
    modules: [
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: require('../babelConfig'),
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader'
          },
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              digest: 'hex',
              name: 'static/media/[name].[hash:8].[ext]',
            }
          },
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          minetype: 'application/font-woff',
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        }
      },
    ],
  },
  plugins: [
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
