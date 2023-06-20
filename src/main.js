import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)
Vue.config.productionTip = false

Vue.prototype.imgpath = (path) => 'http://192.168.1.4:9000/' + path
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
