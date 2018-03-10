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
import constants from '../shared/constants'

function requireAuth (to, from, next) {
  if (!auth.isAuthenticated()) {
    next(false)
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
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/team/:id',
      name: 'Team',
      component: Team,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/event/:id',
      name: 'Event',
      component: Event,
      props: true,
      meta: {
        requiresAuth: true
      }
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

router.beforeResolve((to, from, next) => {
  if (to.meta.requiresAuth) {
    requireAuth(to, from, next)
  }
  const name = to.name || ''
  const title = `${constants.APP_NAME} - ${name}`
  window.document.title = title
  next()
})

export default router
