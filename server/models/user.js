/**
 * 用户模块 model
 */
const mongoose = require('mongoose');
const schema = mongoose.Schema;
//          解密 / 加密
const { Decrypt, Encrypt } = require('../tool/encrypt')

/**
 * nickname 昵称
 * username 用户名
 * password 密码
 * create_at 创建时间
 */
const userSchema = new schema({
  "nickname": String,
  "username": String,
  "password": String,
  "create_at": Number
});

const User = mongoose.model("user", userSchema);

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
    await User.create(user);
    // 一切顺利，返回成功对象
    return { status: 'success', msg: '注册成功', user }
  }

  // 登录
  async login(username, password){
    let user = await this.findOne(username);
    // 获取到用户信息，说明有次账号
    if( user ){
      // 对称加密 对密码进行加密处理，与数据库中加密密码对比
      if( Encrypt(password) === user.password ){
        return { status: 'success', msg: '登录成功',  userInfo: { username: user.username, nickname: user.nickname, create_at: user.create_at }}
      }
      return { status: 'error', msg: '密码错误' }
    }
    return { status: 'error', msg: '没有该账号' }
  }

  // 查找用户
  async findOne(username = null){
    // 创建一个空对象，用于存放username属性
    let searchParma = {};
    let result = null;
    // if: username有值
    if(!username){
      return { status: 'error', msg: '用户信息为空' }
    }
    try{
      searchParma.username = username;
      // 查询数据库中数据并赋值给result
      result = await User.findOne(searchParma);
    }catch(e){
      // ...
      throw e;
    }
    // 将查询结果返回
    return result && result.toObject();
  }

}

module.exports = new UserService()