const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.js','.jsx']
    },
    devtool: 'eval-source-map',
    entry: {
        app: './src/app.js'
    },
    output: {
        path: '/dist',                                                   // when using only webpack = ./ and when using webpack-dev-server = /
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
                use: [
                    'style-loader',                                 // outputs the css into a <style> tag in the index.html
                    'css-loader',                                   // parses CSS into JavaScript and resolves any dependencies
                    'sass-loader'                                   // Transforms sass into css
                ]
            },
            {
                test: /\.(png|jpg)$/,
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
        new webpack.NamedModulesPlugin(),                            // See the name of modules when HMR updates some modules
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        })
    ]
}