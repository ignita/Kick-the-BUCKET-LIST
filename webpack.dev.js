import { merge } from 'webpack-merge';
import webpackConfig from './webpack.config.js';

export default merge(webpackConfig, {
  mode: 'development',
  entry: ['webpack-hot-middleware/client?timeout=20000', './src/client/App.js'],
  devtool: 'cheap-module-source-map',
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      },
    },
    historyApiFallback: true,
  },
});
