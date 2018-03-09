import { mongo } from 'mongoose';

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
  tag: String,
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
  async addArticle(){
    return 
  }
}