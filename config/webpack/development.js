const { resolve } = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('../paths');
const Package = require(paths.appPackageJson);
const commonConfig = require('./base')

module.exports = webpackMerge(commonConfig, {
  devtool: 'inline-source-map',
  entry: {
    index: [
      require.resolve('react-hot-loader/patch'),
      require.resolve('webpack-hot-middleware/client'),
      require.resolve('babel-polyfill'),
      './index.js',
    ],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: resolve(paths.app),
        options: {
          useEslintrc: false,
          configFile: resolve(__dirname, '..', 'eslintrc')
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
      template: resolve(paths.appHtml),
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
    contentBase: resolve(paths.appBuild),
    publicPath: '/',
  },
})
