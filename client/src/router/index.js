import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: () => import(/* webpackChunkName: "frontnav" */ '../components/FrontNav.vue'),
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
    component: () => import(/* webpackChunkName: "frontpage" */ '../views/FrontPage.vue')
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
  path: '/home',
  component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
  beforeEnter: (to, from, next) => {
    if (!localStorage.getItem('token')) {
      next('/')
    } else {
      next()
    }
  },
  children: [{
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "welcome" */ '../components/Welcome.vue')
  },
  {
    path: 'today',
    name: 'today',
    component: () => import(/* webpackChunkName: "today" */ '../views/Today.vue')
  },
  {
    path: 'week',
    name: 'week',
    component: () => import(/* webpackChunkName: "week" */ '../views/Week.vue')
  },
  {
    path: 'project',
    name: 'project',
    component: () => import(/* webpackChunkName: "project" */ '../views/Project.vue')
  }
  ]
}
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,  
})

export default router
