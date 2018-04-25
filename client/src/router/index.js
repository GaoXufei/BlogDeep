import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/Index' // 首页
import Posts from '@/views/posts' // 文章列表页
import Article from '@/views/article' // 文章内容
import Login from '@/admin/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: '/posts/:id',
      name: 'postsTemplate',
      component: Article
    },
    {
      path: '/login',
      name: 'loginTemplate',
      component: Login
    }
    
  ]
})
