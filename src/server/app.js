const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config');
const compiler = webpack(webpackConfig);

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
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

app.get('/', function (req, res) {
  res.sendFile(__dirname + './dist/index.html');
});
module.exports = app;
