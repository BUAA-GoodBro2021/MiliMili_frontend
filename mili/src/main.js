import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import "@/assets/css/global.css"

// 实现自定义加载动画效果
import loading from './assets/Loading/index';
Vue.use(loading);


Vue.use(ElementUI);
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.prototype.$axios = axios

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://milimili.super2021.com/api/'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
