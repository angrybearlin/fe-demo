import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedstate({
    storage: window.sessionStorage,
    reducer (val) {
      return {
        menu: val.menu,
        userId: val.userId
      }
    }
  })],
  state: {
    loading: 0,
    menu: [],
    userId: []
  },
  mutations: {
    OPEN_LOADING: (state) => { state.loading++},
    CLOSE_LOADING: (state) => { state.loading--},
    SET_MENU: (state, menu) => {state.menu = menu},
    SET_USERID: (state) => {state.userId = userId}
  },
  getters: {
    GET_LOADING: (state) => state.loading,
    GET_MENU: (state) => state.menu,
    GET_USERID: (state) => state.userId
  },
  modules: {
  }
})
