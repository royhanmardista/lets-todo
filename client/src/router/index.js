import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: () => import(/* webpackChunkName: "frontnav" */ '../views/FrontNav.vue'),
  beforeEnter: (to, from, next) => {
    if (localStorage.getItem('token')) {
      next('/home')
    } else {
      next()
    }
  },
  children: [{
    path: '/',
    name: 'frontpage',
    component: () => import(/* webpackChunkName: "frontpage" */ '../components/FrontPage.vue')
  },
  {
    path: 'login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../components/Login.vue')
  },
  {
    path: 'register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../components/Register.vue')
  }
  ]
},
{
  path: '/about',
  name: 'about',
  component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
},
{
  path: '/home',
  component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
  beforeEnter: (to, from, next) => {
    if (!localStorage.getItem('token')) {
      next('/')
    } else {
      next()
    }
  },
  children: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "welcome" */ '../components/Welcome.vue')
    },
    {
      path: 'today',
      name: 'today',
      component: () => import(/* webpackChunkName: "register" */ '../components/Today.vue')
    },
    {
      path: 'week',
      name: 'week',
      component: () => import(/* webpackChunkName: "register" */ '../components/Week.vue')
    }
  ]
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some === '/home') {
    if (!localStorage.getItem('token')) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
