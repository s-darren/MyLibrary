const path = require('path');
const webpack = require('webpack');
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
module.exports = {
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    // 请确保引入这个插件！
    // new VueLoaderPlugin(),
    new ProgressBarPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
    // libraryTarget: 'commonjs2'
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // //   runtimeChunk: 'single',
  // //    splitChunks: {
  // //     cacheGroups: {
  // //       vendor: {
  // //         test: /[\\/]node_modules[\\/]/,
  // //         name: 'vendors',
  // //         chunks: 'all'
  // //       }
  // //     }
  // //   }
  // },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['transform-vue-jsx'], ["@babel/plugin-proposal-decorators", { "legacy": true }]]
          }
        }
      },
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader'
      // },
      {
        test: /\.css$/,
        loaders: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'vue-style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
  // resolve: {
  //   alias: {
  //     // css资源别名
  //     'css': path.join(__dirname, 'src/assets/css'),
  //     'images': path.join(__dirname, 'src/assets/images'),
  //     '@': path.join(__dirname, 'src'),
  //   }
  // },
};