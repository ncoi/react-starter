const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const develop = process.env.NODE_ENV !== 'production';

let rules = [
  { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
  {
    test: /\.(png|jpg|svg|gif)$/,
    use: [
      {
        loader: 'url-loader',
        options: { limit: 11000, name: 'images/[name].[ext]' } // Convert images < 10k to base64 strings
      }
    ]
  },
  {
    test: /\.(eot|otf|svg|ttf|woff|woff2)$/,
    use: [
      {
        loader: 'file-loader',
        options: { name: 'fonts/[name].[ext]' }
      }
    ]
  }
];

let plugins = [
  new CleanWebpackPlugin('build'),
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
    }
  })
];

if(!develop) {
  rules = rules.concat([
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')({browsers: ['last 2 versions']})
                ];
              }
            }
          },
          'sass-loader'
        ]
      })
    }
  ]);
  plugins = plugins.concat([
    new ExtractTextPlugin('css/styles.css'),
    new OptimizeCssAssetsPlugin()
  ]);
} else {
    rules = rules.concat([
      {
        test: /\.scss$/,
        use: [
          // outputs the css into a <style> tag in the index.html
          'style-loader',
          // parses CSS into JavaScript and resolves any dependencies
          'css-loader',
          // auto prefixing css properties
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')({browsers: ['last 2 versions']})
                ];
              }
            }
          },
          // Transforms sass into css
          'sass-loader'
        ]
      }
    ]);
    plugins = plugins.concat([
      // See the name of modules when HMR updates some modules
      new webpack.NamedModulesPlugin()
    ]);
}

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: develop ? 'eval-source-map' : false,
  entry: {
    app: './src/app.js'
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  stats: {
    colors: true
  },
  module: {
    rules: rules
  },
  plugins: plugins
}

//"build-dev": "node_modules/.bin/webpack-dev-server --config webpack.config.dev.js --progress --hot --inline",
//"build-prod": "node_modules/.bin/webpack -p --config webpack.config.prod.js --progress",
