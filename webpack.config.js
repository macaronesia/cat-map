const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/bundle.[hash:7].js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src/index.html')
    }),
    new LodashModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/all.min.[hash:7].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['env', {'modules': false}], 'stage-2']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'src/assets/css')
        ],
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|png|svg)$/i,
        include: [
          path.resolve(__dirname, 'node_modules')
        ],
        use: [
          {
            loader: 'url-loader'
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        include: [
          path.resolve(__dirname, 'src/assets/img')
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[hash:7].[ext]',
              publicPath: function(url) {
                return path.relative('src/assets/css', url)
              },
              outputPath: function(url) {
                return path.relative('src', url)
              }
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {

              },
              optipng: {
                enabled: false
              },
              pngquant: {

              },
              gifsicle: {

              }
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        include: [
          path.resolve(__dirname, 'src/assets/pic')
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[hash:7].[ext]',
              publicPath: function(url) {
                return path.relative('src', url)
              },
              outputPath: function(url) {
                return path.relative('src', url)
              }
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {

              },
              optipng: {
                enabled: false
              },
              pngquant: {

              },
              gifsicle: {

              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src/')
    }
  },
  devtool: 'source-map'
};
