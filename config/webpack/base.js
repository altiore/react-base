'use strict';

const { resolve } = require('path');
const webpack = require('webpack');
const paths = require('../paths');
const Package = require(paths.appPackageJson);

module.exports = {
  name: Package.name,
  context: paths.app,
  target: 'web',
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[hash:8].chunk.js',
    publicPath: '/',
    pathinfo: true,
  },
  resolve: {
    extensions: ['.js', '.json', '.md'],
    alias: {
      components: resolve(paths.app, 'components'),
      pages: resolve(paths.app, 'pages'),
      helpers: resolve(paths.app, 'helpers'),
      static: resolve(paths.appPath, 'static'),
      store: resolve(paths.app, 'store'),
      styles: resolve(paths.app, 'styles'),
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
        options: require('../babelrc'),
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
