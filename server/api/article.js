/**
 * 文章
 */
const config = require('../config/index')
const { article: ROUTER_NAME } = config.routerName
module.exports = function (router) {
  router.prefix(`${config.app.apiPath}/${config.routerName.article}`)
  router.get('/', async ctx => {
    
    
  })
}