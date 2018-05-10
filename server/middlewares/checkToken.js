const jwt = require('jsonwebtoken');
const config = require('../config/index')

module.exports = async (ctx, next) => {
  const authorization = ctx.get('Authorization');
  // 如果头部没有用户信息 报出错误
  if( authorization === '' ) return ctx.throw(401, 'no token detected in http header "Authorization"');
  const token = authorization.split(' ')[1];
  try{
    await jwt.verify(token, config.jwt.cert)
  }catch(e){
    ctx.throw(401, err)
  }
  await next();
}