import { merge } from 'webpack-merge';
import webpackConfig from './webpack.config.js';
import path from 'path';
const __dirname = path.resolve();

export default merge(webpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      },
    },
    static: {
      directory: path.join(__dirname, './'),
    },
    historyApiFallback: true,
  },
});
