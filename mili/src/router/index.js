import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    /* redirect 重定向 
      执行/根目录路由地址时，就跳转执行/homepage路由地址 ，进而把对应的组件给显示出来。*/
    redirect: '/homepage',
    component: () => import('../views/HomePage/HeadView.vue'),
    children: [
      {
        path: '/PersonalHomePage',
        name: 'PersonalHomePage',
        component: () => import('../views/PersonalHomePage/PHP.vue'),
        meta: {
          requireAuth: true
        },
        children: [{
          path: '/PersonalHomePage/Main',
          name: 'PersonalHomePage/Main',
          component: () => import('../components/PHP/PHPMain.vue'),
          hidden: true,
        }, {
          path: '/PersonalHomePage/Star',
          name: 'PersonalHomePage/Star',
          component: () => import('../components/PHP/PHPStar.vue'),
          hidden: true,
        }, {
          path: '/PersonalHomePage/fans',
          name: 'FanPage',
          component: () => import('../views/PersonalHomePage/PHP/FollowersPage.vue'),
        },
        {
          path: '/PersonalHomePage/followings',
          name: 'FollowerPage',
          component: () => import('../views/PersonalHomePage/PHP/FollowingPage.vue'),
        }
        ],
      }, {
        path: '/OthersHomePage/',
        name: 'OthersHomePage',
        component: () => import('../views/OthersHomePage/OHP.vue'),
        children: [{
          path: '/OthersHomePage/Main/:id',
          name: 'OthersHomePage/Main',
          component: () => import('../components/OHP/OHPMain.vue'),
          hidden: true,
        }, {
          path: '/OthersHomePage/Star/:id',
          name: 'OthersHomePage/Star',
          component: () => import('../components/OHP/OHPStar.vue'),
          hidden: true,
        }, {
          path: '/OthersHomePage/fans/:id',
          name: 'FanPage',
          component: () => import('../views/OthersHomePage/OthersFollowersPage.vue'),
        },
        {
          path: '/OthersHomePage/followings/:id',
          name: 'FollowerPage',
          component: () => import('../views/OthersHomePage/OthersFollowingPage.vue'),
        }]
      },
      {
        path: '/PersonalInformation',
        name: 'PersonalInformation',
        meta: {
          requireAuth: true
        },
        component: () => import('../views/PersonalHomePage/PIFM.vue'),
      },
      {
        path: '/PersonalContribution',
        name: 'PersonalContribution',
        meta: {
          requireAuth: true
        },
        component: () => import('../views/PersonalHomePage/PC.vue'),
        children: [{
          path: '/PChome',
          name: 'PersonalContributionHome',
          component: () => import('../components/PC/PChome.vue'),
          meta: {
            requireAuth: true
          },
          hidden: true
        }, {
          path: '/PCmanageVideo',
          name: 'PersonalContributionManageVideo',
          component: () => import('../components/PC/PCmanageVideo.vue'),
          meta: {
            requireAuth: true
          },
          hidden: true
        }, {
          path: '/PCmanageComplaint',
          name: 'PersonalContributionManageComplaint',
          component: () => import('../components/PC/PCmanageComplaint.vue'),
          meta: {
            requireAuth: true
          },
          hidden: true
        }, {
          path: '/PCMessage',
          name: 'PersonalContributionMessage',
          component: () => import('../components/PC/PCMessage.vue'),
          meta: {
            requireAuth: true
          },
          hidden: true
        }]
      },
      {
        path: '/admin',
        name: 'AdminPage',
        meta: {
          requireAuth: true
        },
        component: () => import('../views/admin/CheckVideo.vue'),
      },
      {
        path: '/videodetail/:id',
        name: 'VideoDetail',
        component: () => import('../views/VideoDetail.vue/VideoDetailPage.vue'),
      },
      //在这里填写的路由都将获得不透明header
    ]
  },
  // {
  //   path: '/index',
  //   name: 'IndexPage',
  //   component: () => import('../views/HomePage/IndexView.vue'), //逼格界面
  // },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('../views/account/LoginView.vue'),
  },
  {
    path: '/ChangePassword',
    name: 'ChangePassword',
    meta: {
      requireAuth: true
    },
    component: () => import('../views/account/PSW.vue'),

  },
  {
    path: '/homepage',
    name: 'HomePage',
    component: () => import('../views/HomePage/HomeView.vue'), //视频主页
  },
  {
    path: '/search',
    name: 'SearchPage',
    component: () => import('../views/HomePage/SearchView.vue')
  },
  {
    path: '/block/:blockid',
    name: 'BlockPage',
    component: () => import('../views/HomePage/SingleBlockView.vue')
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  // 通过 Vuex 获取用户登录信息（在实战篇中会介绍到）
  const userInfo = localStorage.getItem('loginMessage')

  // 若用户未登录且访问的页面需要登录，则跳转至登录页面
  if (userInfo == null && to.meta.requireAuth) {
    Message({
      type: 'warning',
      message: '请先登录！'
    })
    next({
      name: 'LoginPage',
    })
  }

  next()
})

export default router
