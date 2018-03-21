/**
 * 密码 
 * 加密 or 解密
 */
const crypto = require('crypto');
const config = require('../config/index')
// 秘钥
const { secret } = config.crypto
// 加密方法
function Encrypt(password){
  // 定义加密规则
  const cipher = crypto.createCipher('aes192', secret);
  // 转码方式从utf-8转为hex
  let enc    = cipher.update(password, 'utf-8', 'hex');
  // 编码方式转为hex
  enc += cipher.final('hex');

  return enc
}
// 解密方法
function Decrypt(password){
  // 定义解密规则
  const decipher = crypto.createDecipher('aes192', secret);
  // 转码方式从hex转为utf-8
  let dec      = decipher.update(password, 'hex', 'utf-8');
  // 编码方式转为utf-8
  dec += decipher.final('utf-8');

  return dec
}


module.exports = {
  Encrypt,
  Decrypt
}
