import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index',
    component: () => import('../views/HomePage/HeadView.vue'),
    children:[
      {
        path: '/index',
        name: 'IndexPage',
        component: () => import('../views/HomePage/IndexView.vue'), //逼格界面
      },
      {
        path: '/homepage',
        name: 'HomePage',
        component: () => import('../views/HomePage/HomeView.vue'), //视频主页
      },
      //在这里填写的路由都将获得header
    ]
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('../views/account/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import('../views/account/RegisterView.vue'),
  }
]

const router = new VueRouter({
  mode:'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
