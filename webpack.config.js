const path                  = require('path');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require("mini-css-extract-plugin");
const webpack               = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, {mode}) => {
  console.log({mode})

  const isProduction = mode === 'production'

  const backendUrl = isProduction
    ? 'https://fierce-shelf-74800.herokuapp.com/api/notes'
    : 'http://localhost:3001/api/notes'

  return {
    // entry: './src/index.js',
    output: {
      clean: true,
      filename: isProduction ? '[name].[contenthash].js' : 'main.js',
      path: path.resolve(__dirname, 'build')
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backendUrl)
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        ignoreOrder: false
      }),
    ],
    devServer: {
      // contentBase: path.resolve(__dirname, 'build'), default,
      open: true, // para abrir el navegador
      overlay: true,
      compress: true,
      port: 3000
    },
    //devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
              // Disables attributes processing
              sources: false,
              minimize: true,
            },
        },
        {
          test: /\.(c|sc|sa)ss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
        /*{
          test: /style.(c|sc|sa)ss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },*/
        {
          test: /\.(jpe?g|png|gif|svg|webp)$/i,
          use:["file-loader?name=assets/[name].[ext]", "image-webpack-loader"]
        },
        {
          test: /\.(woff)$/i,
          use:["file-loader?name=assets/[name].[ext]"]
        },
        {
          test: /\.(mp3|wav|mpe?g|ogg)$/i,
          use:["file-loader?name=assets/sound/[name].[ext]"]
        }
      ]
    }
  }
}