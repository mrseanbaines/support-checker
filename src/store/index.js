/* eslint-disable no-console */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: null,
    browsers: null,
    categories: null,
  },
  getters: {
    data: state => state.data,
    browsers: state => state.browsers,
    categories: state => state.categories,
  },
  mutations: {
    update(state, payload) {
      state.data = Object.entries(payload.data);
      state.browsers = Object.entries(payload.agents);
      state.categories = Object.entries(payload.cats);
    },
  },
  actions: {
    fetch({ commit }) {
      Vue.http.get('https://raw.githubusercontent.com/Fyrd/caniuse/master/data.json').then(
        (response) => {
          commit('update', response.body);
        },
      );
    },
  },
});
