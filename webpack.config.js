const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    host: `localhost`,
  },
  devtool: 'eval-source-map',
  entry: {
    main: ['webpack-hot-middleware/client?reload=true&timeout=1000', './src/client/App.js'],
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({title: 'Development'}), new webpack.HotModuleReplacementPlugin()],
};
