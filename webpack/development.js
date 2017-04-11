const { resolve } = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Package = require('../../package');
const commonConfig = require('./base');

module.exports = webpackMerge(commonConfig, {
  devtool: 'inline-source-map',
  entry: {
    index: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      resolve(__dirname, 'polyfills.js'),
      './index.js',
    ],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: resolve(__dirname, '..', '..', 'app'),
        options: {
          useEslintrc: false,
          configFile: resolve(__dirname, '..', 'eslintConfig.js')
        }
      },
      {
        test   : /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
    }),
    new HtmlWebpackPlugin({
      title: Package.title,
      cache: true,
      showErrors: true,
      template: resolve(__dirname, '..', '..', 'static', 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  devServer: {
    hot: true,
    inline: true,
    contentBase: resolve(__dirname, '..', '..', 'dist'),
    publicPath: '/',
  },
})
