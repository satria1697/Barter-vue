import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginInfo: null
  },
  getters: {
    getLoginInfo: state => {
      return state.loginInfo;
    }
  },
  mutations: {
    setLoginInfo: (state, payload) => {
      state.loginInfo = payload;
    }
  },
  actions: {
    setLoginInfo({ commit }, payload) {
      commit("setLoginInfo", payload);
    }
  },
  modules: {}
});
