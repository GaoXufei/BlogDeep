# API:
> 以下api均以http://127.0.0.1:7001/api为前缀
接收get参数
page Number 页数
tab String 主题分类。目前有 ask share job good
limit Number 每一页的主题数量
> 获取文章列表
```
  GET /article
```
> 根据id筛选文章
```
  GET /article/by/:id 
```