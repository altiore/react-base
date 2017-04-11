'use strict';

const webpack = require('webpack');
const { resolve } = require('path');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Package = require('../../package');

const commonConfig = require('./base');

module.exports = webpackMerge(commonConfig, {
  entry: {
    index: [
      resolve(__dirname, 'polyfills.js'),
      './index.js'
    ],
  },
  output: {
    pathinfo: false
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'resolve-url-loader',
            {
              loader: 'postcss-loader',
              options: {
                config: resolve(__dirname, '..', './postcss.config.js'),
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              }
            }
          ],
        }),
      },
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new InterpolateHtmlPlugin({
      'NODE_ENV': process.env.NODE_ENV || 'development',
      'PUBLIC_URL': '/'
    }),
    new HtmlWebpackPlugin({
      title: Package.title,
      inject: true,
      template: resolve(__dirname, '..', '..', 'static', 'index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      },
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      comments: false,
      drop_console: true,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash].css',
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    }),
  ],
})
