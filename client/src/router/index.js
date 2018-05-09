import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/Index' // 首页
import Posts from '@/components/posts/posts' // 文章列表页
import Article from '@/components/posts/article' // 文章内容
import Login from '@/admin/login' // 登录页面
import Edit from '@/admin/edit' // 文章编辑
import AdminArticleList from '@/admin/list' // 后台文章列表
import AdminArticlePatch from '@/admin/patch' // 更新文章
import Admin from '@/admin/admin' // 后台

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
      path: '/admin',
      name: 'adminTemplate',
      component: Admin,
      children: [
        {
          path: '/admin/edit',
          name: 'article_edit',
          component: Edit
        },
        {
          path: '/admin/list',
          name: 'article_list',
          component: AdminArticleList
        },
        {
          path: '/admin/patch/:id',
          name: 'article_patch',
          component: AdminArticlePatch
        }
      ]
    },
    {
      path: '/admin/login',
      name: 'loginTemplate',
      component: Login
    },
    // {
    //   path: '/admin/edit',
    //   name: 'article_edit',
    //   component: Edit
    // },
    // {
    //   path: '/admin/list',
    //   name: 'article_list',
    //   component: AdminArticleList
    // },
    // {
    //   path: '/admin/patch/:id',
    //   name: 'article_patch',
    //   component: AdminArticlePatch
    // }
    
    
  ]
})
