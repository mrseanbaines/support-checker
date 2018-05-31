/* eslint-disable no-console */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: null,
    browsers: null,
    statuses: null,
    categories: null,
    selectedBrowser: '',
    selectedVersion: '',
    selectedCategories: [],
    query: '',
  },
  getters: {
    data: state => state.data,
    browsers: state => state.browsers,
    statuses: state => state.statuses,
    categories: state => state.categories,
    selectedBrowser: state => state.selectedBrowser,
    selectedVersion: state => state.selectedVersion,
    selectedCategories: state => state.selectedCategories,
    query: state => state.query,
  },
  mutations: {
    update(state, payload) {
      state.data = Object.entries(payload.data);
      state.browsers = Object.entries(payload.agents);
      state.statuses = payload.statuses;
      state.categories = Object.entries(payload.cats);
    },
    setSelected(state, payload) {
      Object.assign(state, payload);
      if (Object.keys(payload)[0] === 'selectedBrowser') {
        state.selectedVersion = '';
      }
    },
    setCategories(state, payload) {
      state.selectedCategories = payload.reduce((accumulator, currentValue) =>
        accumulator.concat(currentValue), [],
      );
    },
    setSearch(state, payload) {
      state.query = payload;
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
    setSelected({ commit }, payload) {
      commit('setSelected', payload);
    },
    setCategories({ commit }, payload) {
      commit('setCategories', payload);
    },
    setSearch({ commit }, payload) {
      commit('setSearch', payload);
    },
  },
});
