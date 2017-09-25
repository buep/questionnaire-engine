/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser'
import open from 'open';
import webpack from 'webpack';
import helmet from 'helmet'

import config from '../webpack.config.dev';
var surveyApi = require('../api/survey-api')
import responseAPI from '../api/response-api'


const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(helmet());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.use('/api', surveyApi);

app.use('/form', responseAPI);

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
