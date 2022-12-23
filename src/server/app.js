const express = require('express');
const logger = require('morgan');
const webpack = require('webpack');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();

app.use(logger('common'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV !== 'production') {
  const webpackConfig = require('../../webpack.config');

  webpackConfig.entry.main.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000');
  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    }),
  );

  app.use(
    webpackHotMiddleware(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000,
    }),
  );
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
}

module.exports = app;
