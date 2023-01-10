import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import errorHandler from './middlewares/errorHandler.js';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import apiRouter from './routes/api.js';


const app = express();

const invalidPathHandler = (request, response, next) => {
  response.status(404);
  response.send('invalid path');
};

app.use(helmet());

app.use(logger('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV !== 'production') {
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

app.use(errorHandler);
app.use(invalidPathHandler);

export default app;
