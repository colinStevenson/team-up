// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueApollo from 'vue-apollo'
import apolloClient from './apollo'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'

Vue.config.productionTip = false
Vue.use(VueApollo)
Vue.use(VueMomentJS, moment)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  apolloProvider,
  router,
  template: '<App/>',
  components: { App }
})
