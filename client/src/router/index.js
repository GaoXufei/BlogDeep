import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/Index'
import Posts from '@/views/posts'

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
    }
  ]
})
