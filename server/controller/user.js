/**
 * 用户模块 controller
 */
const config = require('../config/index');
const { user: ROUTER_NAME } = config.routerName;
const userServer = require('../models/user');

module.exports = function (router) {
  router.post(`/${ROUTER_NAME}/register`, async (ctx, next) => {
    try{
      let result = {
        nickname: ctx.request.body.nickname,
        username: ctx.request.body.username,
        password: ctx.request.body.password
      }
      ctx.body = await userServer.register(result);
      ctx.status = 200;
    }catch(e){
      ctx.body = e
      ctx.status = 404
      // ...
    }
  })
  router.post(`/${ROUTER_NAME}/login`, async (ctx, next) => {
    try{
      const { username, password } = ctx.request.body;
      if( !username || !password ){
        ctx.body = { status: 'error', msg: '账号/密码不能为空！' };
        return false;
      }
      ctx.body = await userServer.login(username, password);
    }catch(e){
      // ...
    }
  })

}