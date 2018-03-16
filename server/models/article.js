/**
 * 文章模块
 */
const mongoose = require('mongoose');
const config = require('../config/index')

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
   */
  async addArticle(ops){
    const articleMongo = new article(ops);
    let result = null;
    result = await articleMongo.save()
    return result;
  }
  // 全部文章
  /**
   * 
   * @param { String } sort 排序方式
   * @param { Number } limit 每页显示的条目数量
   * @param { Number } skip 从多少条数据开始
   */
  async findArticle(sort = null, limit = null, skip = null){
    let result = null;
    result = await article.find()
      .populate('tag')
      .select('title tags create_at content')
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .exec()
    return result && result.map(item => item.toObject());
  }
  // 根据数据库_id查找对应文章
  /**
   * id: mongoDB中的ObjectId
   */
  async findArticleById(id){
    let result = null;
    let _id = mongoose.mongo.ObjectId(id);
    result = await article.findOne({ "_id": _id });
    return result;
  }
  // 根据_id删除对应文章条目
  /**
   * id: mongoDB中的ObjectId
   */
  async delArticleById(id){
    let result = null;
    let _id = mongoose.mongo.ObjectId(id);
    result = await article.remove({ "_id": _id });
    return result;
  }
  // 根据_id修改对应文章
  async updateArticleById(id, obj){
    let result = null;
    let _id = mongoose.mongo.ObjectId(id);
    result = await article.updateOne({ "_id": _id }, obj)
    return result;
  }
}


module.exports = new Article()