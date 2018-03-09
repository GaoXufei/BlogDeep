/**
 * 生产环境配置文件
 */


module.exports = {
  // 应用配置
  app: {
    name: 'flyblog',
    port: 7001,
    // 后台路径
    apiPath: '/api'
  },

  // 是否开启debug
  debug: false,

  // mongodb数据库配置文件
  mongoConfig: {
    url: 'mongodb://127.0.0.1:27017/flyblog',
    opts: {
      user: '',
      pass: ''
    }
  },

  // jwt秘钥
  jwt: {
    'cert': 'flyblog'
  },

  // 路由名称
  routerName: {
    // 我
    me: 'me',
    // 文章
    article: 'article',
    // 草稿
    drafts: 'drafts',
    // 标签
    tag: 'tag',

  }


}