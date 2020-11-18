const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ],
  mode: 'production',
  devtool: 'source-map',
  entry: {
    main: './library.js'
  },
  output: {
    library: 'dl',
    libraryTarget: 'umd'
  },
  // 排除依赖包打包进组件库
  externals: [
  ]
});