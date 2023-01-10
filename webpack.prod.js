import { merge } from 'webpack-merge';
import webpackConfig from './webpack.config.js';

export default merge(webpackConfig, {
  mode: 'production',
  entry: ['./src/client/App.js'],
});
