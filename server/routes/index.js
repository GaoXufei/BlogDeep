const Router = require('koa-router'),
      router = new Router();
const article  = require('../api/article');


function routes(app){
  app
    .use(router.routes(), router.allowedMethods());

  article(router)
}

module.exports = routes
