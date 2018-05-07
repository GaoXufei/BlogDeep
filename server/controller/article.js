/**
 * 文章 Controller
 */
const config = require('../config/index')
const { article: ROUTER_NAME } = config.routerName
const articleMongoServer = require('../models/article')
const { CreateObject } = require('../tool/articleTool')
const trimHTML = require('trim-html')
const mongoose = require('mongoose')

module.exports = function (router) {
  // 查询所有文章 
  router.get(`/${ROUTER_NAME}`, async (ctx, next) => {
    try{
       // 第几页
      let page = Number(ctx.query.page);
      // 每页显示条数
      let pageSize = Number(ctx.query.pageSize);
      let skip = Number((page - 1) * pageSize); 
      let result = await new Article().findArticle({ "create_at": -1 }, pageSize, skip);
      // 处理文章主内容，截取前180字
      result.map(response => response.content = trimHTML(response.content, { limit: 180 }))
      ctx.body = result;
      ctx.status = 200;
    }catch(e){
      ctx.body = { error: e }
      ctx.status = 500;
    }
  }) 
  // 根据_id查找对应文章
  router.get(`/${ROUTER_NAME}/by`, async (ctx, next) => {
    try{
      ctx.body = await new Article().findArticleById(ctx.query.id);
      ctx.status = 200
    }catch(e){
      console.log(e)
      ctx.body = e
      ctx.status = 404
    }
  })
  // 添加文章
  router.post(`/${ROUTER_NAME}/add`, async (ctx, next) => {
    try{
      ctx.body = await new Article().addArticle((CreateObject(ctx.request.body)))
      ctx.status = 200;
    }catch(e){
      console.log(e)
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
      ctx.body = await new Article().delArticleById(ctx.params.id);
      ctx.status = 200;
    }catch(e){
      ctx.body = { error: e }
      ctx.status = 404
    }
  })
  // 根据_id更新数据
  router.patch(`/${ROUTER_NAME}/update/:id`, async (ctx, next) => {
    try{
      
      ctx.body = { status: true, message: '修改成功！' }
      ctx.status = 200;
    }catch(e){
      ctx.body = { error: e }
      ctx.status = 404
    }
  })
  // 根据tag获取文章列表
  router.get(`/${ROUTER_NAME}/tags/`, async (ctx, next) => {
    try{
      ctx.body = await new Article().findArticleListByTag(ctx.query.tag);
      ctx.status = 200
    }catch(e){
      // ...
    }
   
  })
}


// 处理文章数据
class Article {
  /**
   * 文章添加
   * @param { Object } ops 参数选项
   */
  async addArticle(ops){
    const articleMongo = new articleMongoServer(ops);
    let result = null;
    try{
      if(await articleMongo.save()){
        return {
          status: 'success',
          msg: '文章添加成功'
        }
      }
    }catch(e){
      return {
        status: 'error',
        msg: '文章添加失败'
      }
    }
  }
  /**
   * 全部文章
   * @param { String } sort 排序方式
   * @param { Number } limit 每页显示的条目数量
   * @param { Number } skip 从多少条数据开始
   * return 返回全部文章列表
   */
  async findArticle(sort = null, limit = null, skip = null){
    let result = null;
    result = await articleMongoServer.find()
      .select('title content tags create_at')
      .sort(sort)
      .limit(limit)
      .skip(skip)

    return result && result.map(item => item.toObject());
  }
  /**
   * 根据数据库_id查找对应文章
   * id: mongoDB中的ObjectId
   * return 返回查询出的文章
   */
  async findArticleById(id){
    let result = null;
    let _id = mongoose.mongo.ObjectId(id);
    result = await articleMongoServer.findOne({ "_id": _id });
    return result;
  }
  /**
   * 根据标签查询相关文章
   * 使用正则进行模糊搜索
   * $regex <- 也可使用
   * return 返回标签相关文章列表
   */
  async findArticleListByTag(tag){
    let result = null;
    result = await articleMongoServer.find({tags: new RegExp(tag)})
    return result;
  }
  /**
   * 根据_id删除对应文章条目
   * id: mongoDB中的ObjectId
   * return 返回状态
   */
  async delArticleById(id){
    let result = null;
    let _id = mongoose.mongo.ObjectId(id);
    
    try{
      if(await articleMongoServer.remove({ "_id": _id })){
        return {
          status: 'success',
          msg: '删除成功'
        }
      }
    }catch(e){
      return {
        status: 'error',
        msg: '删除失败'
      }
    }
  }
  // 根据_id修改对应文章
  // return 返回状态
  async updateArticleById(id, obj){
    let result = null;
    let _id = mongoose.mongo.ObjectId(id);
    try{
      if(await articleMongoServer.updateOne({ "_id": _id }, obj)){
        return {
          status: 'success',
          msg: '修改成功'
        }
      }
    }catch(e){
      return {
        status: 'error',
        msg: '修改失败'
      }
    }
    
  }
}