const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.js','.jsx']
    },
    entry: {
        app: './src/app.js'
    },
    output: {
        path: './dist',                                                   // when using only webpack = ./ and when using webpack-dev-server = /
        filename: '[name].bundle.js',
        publicPath: 'http://localhost:8080/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: '/node_modules/',
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015','react']
                    }
                }]
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css-loader','sass-loader'])
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 11000, name: 'images/[name].[ext]' }                   // Convert images < 10k to base64 strings
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin('dist'),
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin('css/styles.css'),
        new OptimizeCssAssetsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
        })
    ]
}