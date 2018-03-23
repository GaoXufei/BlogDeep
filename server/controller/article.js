/**
 * 文章 Controller
 */
const config = require('../config/index')
const { article: ROUTER_NAME } = config.routerName
const articleServer = require('../models/article')
const { CreateObject } = require('../tool/articleTool')

module.exports = function (router) {
  // 查询所有文章 
  router.get(`/${ROUTER_NAME}`, async (ctx, next) => {
    try{
      // 分页 按时间倒序
      // 每页10条
      // 从数据库的第0条开始
      let page = ctx.query.page;
      ctx.body = await articleServer.findArticle({ "create_at": -1 }, 10, 0);
      ctx.status = 200
    }catch(e){
      ctx.body = { error: e }
      ctx.status = 500
    }
  }) 
  // 根据_id查找对应文章
  router.get(`/${ROUTER_NAME}/by/:id`, async (ctx, next) => {
    try{
      ctx.body = await articleServer.findArticleById(ctx.params.id);
      ctx.status = 200
    }catch(e){
      ctx.body = e
      ctx.status = 404
    }
  })
  // 添加文章
  router.post(`/${ROUTER_NAME}/add`, async (ctx, next) => {
    try{
      await articleServer.addArticle((CreateObject(ctx.request.body)))
      ctx.status = 200;
    }catch(e){
      ctx.body = { error: e }
      ctx.status = 404
    }
  })
  /**
   * 根据_id删除对应文章条目(单条)
   * { n: 是否删除失败/成功(0/1) }
   */
  router.del(`/${ROUTER_NAME}/:id`, async (ctx, next) => {
    try{
      if((await articleServer.delArticleById(ctx.params.id)).n == 0){
        throw { status: false, message: '数据删除失败！' }
      }
      ctx.body = await articleServer.delArticleById(ctx.params.id);
      ctx.status = 200;
    }catch(e){
      ctx.body = { error: e }
      ctx.status = 404
    }
  })
  // 根据_id更新数据
  router.patch(`/${ROUTER_NAME}/update/:id`, async (ctx, next) => {
    try{
      if((await articleServer.updateArticleById(ctx.params.id, ctx.request.body)).n == 0){
        throw await articleServer.updateArticleById(ctx.params.id, ctx.request.body) 
      }
      ctx.body = { status: true, message: '修改成功！' }
      ctx.status = 200;
    }catch(e){
      ctx.body = { error: e }
      ctx.status = 404
    }
  })
  // 根据tag获取文章列表
  router.get(`/${ROUTER_NAME}/tags`, async (ctx, next) => {
    try{
      ctx.body = await articleServer.findArticleListByTag(ctx.query.tag);
      ctx.status = 200
    }catch(e){
      // ...
    }
   
  })
}