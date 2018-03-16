const Router = require('koa-router'),
      router = new Router();
const controllers  = require('../controller/index');


function routes(app){
  app
    .use(router.routes(), router.allowedMethods());
    
  controllers(router)
  
}

module.exports = routes
