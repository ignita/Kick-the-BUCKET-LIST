import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import errorHandler from './middlewares/errorHandler.js';
import path from 'path';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.dev.js';
import history from 'connect-history-api-fallback';

import apiRouter from './routes/api.js';

const app = express();

const defaultDirectives = helmet.contentSecurityPolicy.getDefaultDirectives();
const upgradeInsecureRequests = 'upgrade-insecure-requests';
const { [upgradeInsecureRequests]: removeDirective, ...otherDefaultDirectives } = defaultDirectives;

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        ...otherDefaultDirectives,
      },
    },
    crossOriginEmbedderPolicy: false,
  }),
);

app.use(logger('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));

  const __dirname = path.resolve();
  app.get('*', function (request, response) {
    response.sendFile(path.join(__dirname, '/dist/index.html'));
  });
} else {
  app.use(history());

  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {}));
  app.use(webpackHotMiddleware(compiler, {}));
}

app.use(errorHandler);

export default app;
