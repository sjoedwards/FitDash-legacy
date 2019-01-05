const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const APP_DIR = path.resolve(__dirname, '../src');

module.exports = env => {
    return merge([
        {
            entry: ['@babel/polyfill', APP_DIR],
            output: {
                path: path.resolve(__dirname, '../dist'),
                publicPath: '/',
                filename: '[name].js'
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader'
                        }
                    },
                    {
                        test: /\.scss$/,
                        use: [
                            env.PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                            'css-loader',
                            'sass-loader'
                        ]
                    },
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: './src/index.html',
                    filename: './index.html',
                    excludeChunks: [ 'server', 'routes' ]
                }),
                new webpack.DefinePlugin({
                    'process.env.VERSION': JSON.stringify(env.VERSION),
                    'process.env.PLATFORM': JSON.stringify(env.PLATFORM)
                }),
                new CopyWebpackPlugin([ { from: 'src/static' } ])
            ],
            devServer: {
                host: '0.0.0.0',
                port: 3000,
                inline: true,
                proxy: {
                    '/api': 'http://localhost:3000'
                },
                open: true,
                hot: true,
            }
        }
    ]);
};