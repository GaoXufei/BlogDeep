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
  "create_at": Number,
  "token": String
});

module.exports = mongoose.model("user", userSchema);

