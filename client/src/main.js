// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 加入reset.css 重置css样式
import "./styles/reset/reset.css"
// 加入element-ui 和 element-ui的css文件
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
// 引入markdown插件 和 引入mavonEditor样式
import mavonEditor from 'mavon-editor'
import "mavon-editor/dist/css/index.css"
// 使用element-ui
Vue.use(ElementUI)
// 使用mavonEditor
Vue.use(mavonEditor)

Vue.config.productionTip = false

// 加入axios
import axios from 'axios'
// 把axios绑定到vue原型中
Vue.prototype.$axios = axios

Vue.prototype.$axios.defaults.baseURL = 'http://127.0.0.1:7001'

// import store from './store'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // store,
  router,
  components: { App },
  template: '<App/>'
})
