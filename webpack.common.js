const path = require('path');

module.exports = {
  entry: {
    styles: './src/styles/main.scss'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  node: {
    fs: "empty",
    net: "empty",
  },
  devServer: {
    port: 3001,
    open: true,
    historyApiFallback: true,
    proxy: {
      "/": "http://localhost:3000"
    },
  },
};