const webpack = require('webpack');
const webpackConfig = require('../config/webpack.base.config');
const webpackConfigObject = webpackConfig({PLATFORM: 'local', VERSION: 'stage'});
const middleware = require('webpack-dev-middleware');
const compiler = webpack(webpackConfig({PLATFORM: 'local', VERSION: 'stage'}));
const express = require('express');
const path = require('path');
const http = require('http');

const app = express();

app.use(middleware(compiler, {
    noInfo: true, publicPath: webpackConfigObject.output.publicPath

}));

// Point static path to dist
app.use('/', express.static(path.join(__dirname, '..', 'dist')));
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));

const routes = require('../routes');

app.use('/', routes);

/** Get port from environment and store in Express. */
const port = process.env.PORT || '9000';
console.log('port: ', port);
app.set('port', port);

/** Create HTTP server. */
const server = http.createServer(app);
/** Listen on provided port, on all network interfaces. */
server.listen(port, () => console.log(`Server Running on port ${port}`));