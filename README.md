## 博客系统

> 知识点
  * 前端
    * Vue
      * Vuex
      * Vue-router
    * webpack
    * axios
  
  * 中间层
    * Nginx
    * Node
      * Koa
      * Koa-router
      * Koa-cors
      * Koa-bodyparser

> API规定：
```

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

## 查询
  - [x] GET /api/article 全部文章
  - [x] GET /api/article/at/:id 根据_id查询文章
## 增加
  - [x] POST /api/article/add 添加文章
## 删除
  - [ ] DELETE /api/article/delete/:id 根据_id删除文章
## 修改
  - [ ] PATCH /api/article/patch/:id 根据_id修改文章
```