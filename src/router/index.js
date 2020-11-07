import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Projects from '../views/Projects.vue'
import Team from '../views/Team.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {requiresAuth: true},
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        meta: {requiresAuth: true},
        component: Dashboard
      },
      {
        path: '/projects',
        name: 'Projects',
        meta: {requiresAuth: true},
        component: Projects
      },
      {
        path: '/team', 
        name: 'Team',
        meta: {requiresAuth: true},
        component: Team
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {guest: true},
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    meta: {guest: true},
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//Authentication

function loggedIn() {
  return localStorage.getItem('loggedIn');
}

router.beforeEach((to, from, next) => {

  //undefined routes to /
  if(to.matched.length < 1)  {
    next({
      path: '/',
      //query: { redirect: to.fullPath }
    })
  }

  //routes require auth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log(loggedIn());
    console.log(to.matched);

    //needs authentication
    if (!loggedIn()) {
      next({
        path: '/login',
        //query: { redirect: to.fullPath }
      })
    }
    //if authenticated already
    else {
      next()
    }
  }
  
  //routes not require auth
  else if (to.matched.some(record => record.meta.guest)) {

    //logged in ->dashboard
    if (loggedIn()) {
      next({
        path: '/dashboard',
      }) 
    }

    //not logged in -> next
    else {
      next()
    }
  } 
  
  //other routes continue
  else {
    next()
  }
})

export default router
