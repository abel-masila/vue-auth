import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      // eslint-disable-next-line standard/computed-property-even-spacing
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${userData.token}`
    }
  },
  actions: {
    register({ commit }, payload) {
      return axios
        .post('http://localhost:3000/register', payload)
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
        })
    },
    login({ commit }, payload) {
      return axios
        .post('http://localhost:3000/login', payload)
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
        })
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.user
    }
  }
})
