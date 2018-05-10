const jwt = require('jsonwebtoken'),
      config = require('../config/index');

module.exports = function(username){
  const token = jwt.sign({
    username: username
  }, config.jwt.cert, {
    expiresIn: '60s' //过期时间
  })

  return token;
}