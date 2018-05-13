/* eslint-disable no-console */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: null,
    browsers: null,
  },
  getters: {
    data: state => state.data,
    browsers: state => state.browsers,
    filteredData: state =>
      (browser, version) =>
        state.data.filter(prop => prop[1].stats[browser][version] === 'n'),
  },
  mutations: {
    update(state, payload) {
      state.data = Object.entries(payload.data);
      state.browsers = Object.entries(payload.agents);
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
