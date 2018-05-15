import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'


import Index from '@/views/Index' // 首页
import Posts from '@/components/posts/posts' // 文章列表页
import Article from '@/components/posts/article' // 文章内容
import Login from '@/admin/login' // 登录页面
import Register from '@/admin/register'
import Edit from '@/admin/edit' // 文章编辑
import AdminArticleList from '@/admin/list' // 后台文章列表
import AdminArticlePatch from '@/admin/patch' // 更新文章
import Admin from '@/admin/admin' // 后台


Vue.use(Router)

const router = new Router({
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
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      children: [
        {
          path: '/admin/edit',
          name: 'article_edit',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component: Edit
        },
        {
          path: '/admin/list',
          name: 'article_list',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component: AdminArticleList
        },
        {
          path: '/admin/patch/:id',
          name: 'article_patch',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component: AdminArticlePatch
        }
      ]
    },
    {
      path: '/admin/login',
      name: 'loginTemplate',
      component: Login
    },
    {
      path: '/admin/register',
      name: 'registerTemplate',
      component: Register
    }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth){
    let token = store.state.token;
    if(token){
      next()
    }else{
      next({
        path: '/admin/login',
        query: { redirect: to.fullPath }
      })
    }
  }else{
    next()
  }

})

export default router

