// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


// 加入axios
import axios from 'axios'
// 把axios绑定到vue原型中
Vue.prototype.$axios = axios

// 加入reset.css 重置css样式
import "./styles/reset/reset.css"
// 加入element-ui 和 element-ui的css文件
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
// 使用element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
