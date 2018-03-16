/**
 * 文章
 */
const config = require('../config/index')
const { article: ROUTER_NAME } = config.routerName
const articleServer = require('../models/article')
const { CreateObject } = require('../tool/articleTool')

module.exports = function (router) {
  router.prefix(`${config.app.apiPath}/${config.routerName.article}`)
  // 查询所有文章 
  router.get(`/`, async (ctx, next) => {
    try{
      // 分页 按时间倒序
      // 每页10条
      // 从数据库的第0条开始
      ctx.body = await articleServer.findArticle({ "create_at": -1 }, 10, 0);
      ctx.status = 200
    }catch(e){
      ctx.body = { error: e }
      ctx.status = 500
    }
    
  }) 
  // 根据_id查找对应文章
  router.get(`/by/:id`, async (ctx, next) => {
    try{
      if(!await articleServer.findArticleById(ctx.params.id)){
        throw { status: -1, message: '数据获取失败！' }
      }
      ctx.body = await articleServer.findArticleById(ctx.params.id);
    }catch(e){
      ctx.body = e
      ctx.status = 404
    }
  })
  // 添加文章
  router.post(`/add`, async (ctx, next) => {
    try{
      await articleServer.addArticle((CreateObject(ctx.request.body)))
      ctx.status = 200;
    }catch(e){
      ctx.body = { error: e }
      ctx.status = 404
    }
  })
  // 根据_id删除对应文章条目(单条)
  /**
   * { n: 是否删除失败/成功(0/1) }
   */
  router.del(`/:id`, async (ctx, next) => {
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
  router.patch(`/update/:id`, async (ctx, next) => {
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
}