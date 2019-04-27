import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    crawlMethodsInfo: {},
  },
  mutations: {
    setCrawlMethodsInfo(state, crawlMethodsInfo) {
      state.crawlMethodsInfo = crawlMethodsInfo;
    },
  },

})

export default store
