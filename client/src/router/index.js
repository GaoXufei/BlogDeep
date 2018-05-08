import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/Index' // 首页
import Posts from '@/components/posts/posts' // 文章列表页
import Article from '@/components/posts/article' // 文章内容
import Login from '@/admin/login' // 登录页面
import Edit from '@/admin/edit' // 文章编辑
import AdminArticleList from '@/admin/list'

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
      path: '/admin/login',
      name: 'loginTemplate',
      component: Login
    },
    {
      path: '/admin/edit',
      name: 'admin_edit',
      component: Edit
    },
    {
      path: '/admin/list',
      name: 'admin_list',
      component: AdminArticleList
    },
    
    
  ]
})
