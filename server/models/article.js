/**
 * 文章模块
 */
const mongoose = require('mongoose');

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

module.exports = mongoose.model('article', articleSchema);
