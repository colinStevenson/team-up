import Vue from 'vue'
import Vuex from 'vuex'
import events from './modules/events'
import invitations from './modules/invitations'
import teams from './modules/teams'
import user from './modules/user'
import attendances from './modules/attendances'
import roles from './modules/roles'

// Routes
import routes from './modules/routes'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    events,
    invitations,
    roles,
    teams,
    user,
    attendances,
    routes
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
})

export default store
