/**
 * 开发环境配置文件
 */

module.exports = {
  env: 'development',
  debug: true,
  mongoConfig: {
    url: 'mongodb://127.0.0.1:27017/flyblog-dev',
    opts: {
      user: '',
      pass: ''
    }
  },
  'jwt': {
    'cert': 'flyblog-dev'
  }
}