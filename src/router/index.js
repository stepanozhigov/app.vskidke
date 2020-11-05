import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if(!localStorage.getItem('loggedIn')) {
        next({name:'login'})
      } else {
        next();
      }
    }
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/Projects.vue'),
    beforeEnter: (to, from, next) => {
      if(!localStorage.getItem('loggedIn')) {
        next({name:'login'})
      } else {
        next();
      }
    }
  },
  {
    path: '/team',
    name: 'team',
    component: () => import('../views/Team.vue'),
    beforeEnter: (to, from, next) => {
      if(!localStorage.getItem('loggedIn')) {
        next({name:'login'})
      } else {
        next();
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
