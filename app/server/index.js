const webpack = require('webpack');
const configFile = require('../config/webpack.base.config');
const config = configFile({PLATFORM: 'local', VERSION: 'stage'})
const Koa = require('koa');
const koaWebpack = require('koa-webpack');
const Router = require('@koa/router');
const path = require('path');

(async () => {
  const app = new Koa();
  const router = new Router();
  const options = {
    config,
    devMiddleware: {
      // publicPath: config.output.publicPath,
      watchOptions: {
        poll: 100,
      },
    },
    hotClient: false,
  }
  const middleware = await koaWebpack(options)
  app.use(middleware)
  router.get('*', async (ctx: Context) => {
    const filename = path.resolve(config.output.path, 'index.html')
    ctx.response.type = 'html'
    ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(filename)
  });
  app
    .use(router.routes())
    .use(router.allowedMethods());
  app.listen(3001);
})()


