import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './vuex/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    const userString = localStorage.getItem('user')
    if (userString) {
      const userData = JSON.parse(userString)
      this.$store.commit('SET_USER_DATA', userData)
    }
    axios.interceptors.response.use(
      response => response, // simply return the response
      error => {
        if (error.response.status === 401) {
          // if we catch a 401 error
          this.$store.dispatch('logout') // force a log out
        }
        return Promise.reject(error) // reject the Promise, with the error as the reason
      }
    )
  },
  render: h => h(App)
}).$mount('#app')
