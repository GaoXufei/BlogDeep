/**
 * 用户模块 controller
 */
const config = require('../config/index')
const { user: ROUTER_NAME } = config.routerName;
const userServer = require('../models/user')

module.exports = function (router) {
  router.post(`/${ROUTER_NAME}`, async (ctx, next) => {
    // console.log(ctx.request.body)
    try{
      ctx.body = await userServer.create(ctx.request.body);
      ctx.status = 200;
    }catch(e){
      // ...
    }
    

    
  })
}