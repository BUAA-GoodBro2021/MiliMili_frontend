import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index',
    component: () => import('../views/HomePage/HeadView.vue'),
    children: [
      {
        path: '/index',
        name: 'IndexPage',
        component: () => import('../views/HomePage/IndexView.vue'), //逼格界面
      },
      {
        path: '/PersonalHomePage',
        name: 'PersonalHomePage',
        component: () => import('../views/PersonalHomePage/PHP.vue'),
        children: [{
          path: '/PersonalHomePage/Main',
          name: 'PersonalHomePage/Main',
          component: () => import('../components/PHP/PHPMain.vue'),
          hidden: true,
        }, {
          path: '/followers',
          name: 'FollowerPage',
          component: () => import('../views/PersonalHomePage/PHP/FollowersPage.vue'),
        }]
      },
      {
        path: '/PersonalInformation',
        name: 'PersonalInformation',
        component: () => import('../views/PersonalHomePage/PIFM.vue'),
      },
      {
        path: '/PersonalContribution',
        name: 'PersonalContribution',
        component: () => import('../views/PersonalHomePage/PC.vue'),
        children: [{
          path: '/PChome',
          name: 'PersonalContributionHome',
          component: () => import('../components/PC/PChome.vue'),
          hidden: true
        }, {
          path: '/PCmanageVideo',
          name: 'PersonalContributionManageVideo',
          component: () => import('../components/PC/PCmanageVideo.vue'),
          hidden: true
        }, {
          path: '/PCmanageComplaint',
          name: 'PersonalContributionManageComplaint',
          component: () => import('../components/PC/PCmanageComplaint.vue'),
          hidden: true
        }, {
          path: '/PCMessage',
          name: 'PersonalContributionMessage',
          component: () => import('../components/PC/PCMessage.vue'),
          hidden: true
        }]
      },
      {
        path: '/search',
        name: 'SearchPage',
        component: () => import('../views/HomePage/SearchView.vue')
      },
      //在这里填写的路由都将获得不透明header
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
  },
  {
    path: '/homepage',
    name: 'HomePage',
    component: () => import('../views/HomePage/HomeView.vue'), //视频主页
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
