/**
 * 用户模块 controller
 */
const jwt = require('jsonwebtoken');
const config = require('../config/index');
const { user: ROUTER_NAME } = config.routerName;
const userServer = require('../models/user');
//          解密 / 加密
const { Decrypt, Encrypt } = require('../tool/encrypt')
//          创建token / 检测token
const createToken = require('../middlewares/createToken'),
      checkToken = require('../middlewares/checkToken');

module.exports = function (router) {
  // 注册 post
  router.post(`/${ROUTER_NAME}/register`, async (ctx, next) => {
    try{
      let result = {
        nickname: ctx.request.body.nickname,
        username: ctx.request.body.username,
        password: ctx.request.body.password,
        token: createToken(ctx.request.body.username) // 创建token并存入数据库
      };
      ctx.body = await new UserService().register(result);
      ctx.status = 200;
    }catch(e){
      ctx.body = e
      ctx.status = 404
      // ...
    }
  })
  // 登录 post
  router.post(`/${ROUTER_NAME}/login`, async (ctx, next) => {
    try{
      const { username, password } = ctx.request.body;
      if( !username || !password ){
        ctx.body = { status: 'error', msg: '账号/密码不能为空！' };
        return false;
      }
      ctx.body = await new UserService().login(username, password);
    }catch(e){
      // ...
      
      console.log(e)
    }
  })


  // 用户业务逻辑
  class UserService {
    // 注册
    async register(user){
      // 查询数据库
      let result = await this.findOne(user.username);
      // if: 查询结果为有对应数据
      if(result){
        return { status: 'error', msg: '此账号已存在' }
      }
      // 对密码进行加密
      user.password = Encrypt(user.password);
      // 对用户信息对象增加 - 创建时间属性 -
      user.create_at = new Date().getTime();
      // 增加到users库中
      await userServer.create(user);
      // 一切顺利，返回成功对象
      return { status: 'success', msg: '注册成功', user }
    }
  
    // 登录
    async login(username, password){
      // 在数据库中查询账号
      let user = await this.findOne(username);
      // 获取到用户信息，说明有次账号
      if( user ){
        // 对称加密 对密码进行加密处理，与数据库中加密密码对比
        if( password === user.password ){
          // 重新生成一个token 并存到数据库当中
          let token = createToken(username);
          user.token = token;
          this.saveFindData(username, user)
          return { 
            status: 'success', 
            msg: '登录成功', 
            token: token, 
            userInfo: { 
              username: user.username, 
              nickname: user.nickname, 
              create_at: user.create_at 
            }
          }
        }
        return { 
          status: 'error', 
          msg: '密码错误' 
        }
      }
      return { 
        status: 'error', 
        msg: '没有该账号' 
      }
    }
  
    // 查找用户
    async findOne(username = null){
      // 创建一个空对象，用于存放username属性
      let searchParma = {};
      let result = null;
      // if: username有值
      if(!username){
        return { 
          status: 'error', 
          msg: '用户信息为空' 
        }
      }
      try{
        searchParma.username = username;
        // 查询数据库中数据并赋值给result
        result = await userServer.findOne(searchParma);
      }catch(e){
        
        // ...
        throw e;
      }
      // 将查询结果返回
      return result && result.toObject();
    }

    // 根据用户名修改
    async saveFindData(username, obj){
      try{
        await userServer.updateOne({ 'username': username }, obj)
      }catch(e){
        // ...
        console.log('用户修改失败')
      }
    }
  }
}