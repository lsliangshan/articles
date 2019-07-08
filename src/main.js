// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
// Import Framework7
import Framework7 from 'framework7/framework7.esm.bundle.js'

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js'

// Import Framework7 Styles
import 'framework7/css/framework7.bundle.css'

import 'framework7-icons'

import store from './store'

import * as filters from './filters'

import './assets/css/animate.css/animate.min.css'

Framework7.use(Framework7Vue)

require('./directives/index')

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.config.errorHandler = () => {
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  // router,
  components: { App },
  template: '<App/>'
})
