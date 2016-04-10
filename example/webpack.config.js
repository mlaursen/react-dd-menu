'use strict';
/*eslint-env node*/
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const buildFolder = path.resolve(__dirname, 'www');
const js = path.resolve(__dirname, '../src/js');
const nodeModules = path.resolve(__dirname, 'node_modules');

const env = {
  development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined',
  production: NODE_ENV === 'production',
};

const preSuffix = env.production ? '.min' : '';

let config = {
  entry: [
    './src/js/index.jsx',
  ],

  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      loader: 'eslint',
      include: [js],
      exclude: /node_modules/,
    }],

    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: `${env.development ? 'react-hot!': ''}babel`,
    }],
  },

  modulesDirectories: [
    path.resolve(__dirname, 'node_modules'),
    'node_modules',
    js,
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    alias: {
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'react-dd-menu': js,
    },

    fallback: nodeModules,
  },

  resolveLoader: {
    fallback: nodeModules,
  },

  output: {
    path: buildFolder,
    filename: `bundle${preSuffix}.js`,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'www/indexTemplate.html'),
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV || 'development'),
      },
    }),
  ],
  eslint: {
    configFile: '../.eslintrc',
  },

  postcss: function() {
    return [autoprefixer];
  },
};

if(env.development) {
  const host = 'localhost';
  const port = 8080;
  const DEV_URL = `http://${host}:${port}`;
  config.devtool = 'eval';
  config.entry = config.entry.concat([
    `webpack-dev-server/client?${DEV_URL}`,
    'webpack/hot/only-dev-server',
  ]);
  config.cache = true;

  config.devServer = {
    contentBase: buildFolder,
    devtool: 'eval',
    hot: true,
    port: port,
  };

  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: DEV_URL }),
  ]);

  config.module.loaders = config.module.loaders.concat([{
    test: /\.scss$/,
    loader: `style!css!postcss!sass?outputStyle=expanded&sourceMap=true`,
  }]);
} else if(env.production) {
  config.devtool = 'source-map';
  config.module.loaders = config.module.loaders.concat([{
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style', 'css!postcss!sass?outputStyle=compressed'),
  }]);
  config.plugins = config.plugins.concat([
    new ExtractTextPlugin(`[name]${preSuffix}.css`),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
    }),
  ]);
}

module.exports = config;
