const path = require('path');

module.exports = {
  entry: {
    server: './src/server.js'
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
      }
    ]
  },
  node: {
    fs: "empty",
    net: "empty",
  },
  mode: 'development',
  devServer: {
    port: 3001,
    open: true,
    historyApiFallback: true,
    proxy: {
      "/": "http://localhost:3000"
    },
  },
};