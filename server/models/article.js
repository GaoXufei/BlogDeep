/**
 * article model
 */
const mongoose = require('mongoose');
const config = require('../config/index')

// 连接Mongdb
mongoose.connect(config.mongoConfig.url)
// 连接数据库是否成功
mongoose.connection.on("connected", () => {
  console.log(`*** MongoDB connect success! ***`)
})
mongoose.connection.on("error", () => {
  console.log(`### MongoDB connect fail! ###`)
})
// 创建模式
const schema = mongoose.Schema;
const articleSchema = new schema({
  articleId: String,
  title: String,
  tags: Array,
  description: String,
  create_at: String,
  content: String,
  comment: [
    {
      name: String,
      email: String,
      content: String,
      dateTime: String,
      comment_response: [
        {
          response_name: String,
          response_email: String,
          response_content: String,
          response_dateTime: String
        }
      ]
    }
  ]
})

const article = mongoose.model('article', articleSchema);

class Article {
  // 文章添加
  /**
   * 
   * @param { Object } ops 参数选项
   * @parma {}
   */
  async addArticle(ops){
    const articleMongo = new article(ops);
    let result = null;
    try{
      result = articleMongo.save()
    }catch(e){
      return `
        article存入数据库失败！
        ${e}
        `
    }
    return result;
  }
  // 全部文章
  /**
   * 
   * @param { String } sort 
   * @param { Number } limit 
   * @param { Number } skip 
   */
  async findArticle(sort = null, limit = null, skip = null){
    let result = null;
    try{
      result = await article.find()
        .populate('tag')
        .select('title tags create_at content')
        .sort(sort)
        .limit(limit)
        .skip(skip)
        .exec()
      return result && result.map(item => item.toObject())
    }catch(e){
      return `
        article数据查找失败！
        ${e}
      `
    }
    
  }
  // 根据数据库_id查找对应文章
  async findArticleById(id){
    let result = null;
    let _id = mongoose.mongo.ObjectId(id);
    try{
      result = await article.find(_id);
      return result;
    }catch(e){
      return `
        Article By Id数据库查询失败！
        ${e}
      `
    }
    
  }
}


module.exports = new Article()