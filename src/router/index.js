import Vue from 'vue'
import Router from 'vue-router'
import auth from '../auth/AuthService'

// Components
import Event from '@/components/Event'
import Home from '@/components/Home'
import AuthCallback from '@/components/AuthCallback'
import Team from '@/components/Team'
import Teams from '@/components/Teams'
import Register from '@/components/Register'

function requireAuth (to, from, next) {
  if (!auth.isAuthenticated()) {
    next({
      path: '/',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/teams',
      name: 'Teams',
      component: Teams,
      beforeEnter: requireAuth
    },
    {
      path: '/team/:id',
      name: 'Team',
      component: Team,
      props: true,
      beforeEnter: requireAuth
    },
    {
      path: '/event/:id',
      name: 'Event',
      component: Event,
      props: true,
      beforeEnter: requireAuth
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/callback',
      name: 'AuthCallback',
      component: AuthCallback
    }
  ]
})

export default router
