/* eslint-disable no-console */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
    browsers: null,
  },
  getters: {
    data: state => state.data,
    browsers: state => state.browsers,
  },
  mutations: {
    update(state, data) {
      state.data.push(data);
    },
    updateBrowsers(state, data) {
      state.browsers = Object.values(data);
    },
  },
  actions: {
    fetch({ commit }) {
      Vue.http.get('https://raw.githubusercontent.com/Fyrd/caniuse/master/data.json').then(
        (response) => {
          commit('update', response.body.data);
        },
      );
    },
    fetchBrowsers({ commit }) {
      Vue.http.get('https://raw.githubusercontent.com/Fyrd/caniuse/master/data.json').then(
        (response) => {
          commit('updateBrowsers', response.body.agents);
        },
      );
    },
  },
});
