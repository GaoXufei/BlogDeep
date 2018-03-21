const config = require('../config/index');
const Router = require('koa-router'),
      router = new Router({
        prefix: config.app.apiPath
      });
const controllers  = require('../controller/index');

function routes(app){
  app
    .use(router.routes(), router.allowedMethods());



  controllers(router)
  
}

module.exports = routes
