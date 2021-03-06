const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = webpack;
const { ModuleFederationPlugin } = webpack.container;

const deps = require('./package.json').dependencies;
const federationConfig = require("./federation.json");

module.exports = {
  mode: 'none',
  entry: {
    app: path.resolve(__dirname, 'src', 'index'),
  },
  target: 'web',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new ModuleFederationPlugin({
      name: federationConfig.name,
      filename: federationConfig.filename,
      shared: {
        react: { requiredVersion: deps.react, singleton: true },
        'react-dom': { requiredVersion: deps['react-dom'], singleton: true },
      },
      exposes: federationConfig.exposes,
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    port: federationConfig.port,
    host: '0.0.0.0',
    disableHostCheck: true,
    watchOptions: {
      poll: 3000
    }
  },
};
