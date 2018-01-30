import Vue from 'vue'
import Vuex from 'vuex'
import events from './modules/events'
import invitations from './modules/invitations'
import teams from './modules/teams'
import user from './modules/user'
// import gql from 'graphql-tag'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    events,
    invitations,
    teams,
    user
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
})

export default store
