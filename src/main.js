// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
// import Framework7 from 'framework7'
// import Framework7Vue from 'framework7-vue'
import 'framework7/css/framework7.bundle.min.css'
import 'framework7-icons'

// Framework7.use(Framework7Vue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  components: { App },
  template: '<App/>'
})
