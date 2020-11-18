const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  entry: {
    app: './index.js'
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './'
  },
  output: {
    library: 'dl',
    libraryTarget: 'umd'
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: './index.html'
      }
    ),
  ],
  module: {
  }
});