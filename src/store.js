import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    hasLogin: false,
    token: "",
  },
  mutations: {
    setToken(state, token) {
      state.hasLogin = true;
      state.token = token;
    },
    logout(state) {
      state.hasLogin = false
      state.token = null
    },
  },

})

export default store
