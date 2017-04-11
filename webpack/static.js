'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')

const commonConfig = require('./base');

const routes = require('../app/data/mock/routes.json');
const newRoutes = routes.map((route, i) => route.path)

console.log(newRoutes)

module.exports = env => webpackMerge(commonConfig, {
  entry: {
    index: [
      './static.js'
    ],
  },
  output: {
    pathinfo: false,
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.(ejs)?$/,
        exclude: /node_modules/,
        loader: 'ejs-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'resolve-url-loader',
            'postcss-loader',
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
    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash].css',
    }),
    new StaticSiteGeneratorPlugin({
      paths: newRoutes,
      locals: {
        label: 'test'
      }
    }),
  ],
});
