/* eslint-disable no-console */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: null,
    browsers: null,
    categories: null,
    selectedBrowser: '',
    selectedVersion: '',
    selectedCategories: [],
  },
  getters: {
    data: state => state.data,
    browsers: state => state.browsers,
    categories: state => state.categories,
    selectedBrowser: state => state.selectedBrowser,
    selectedVersion: state => state.selectedVersion,
    selectedCategories: state => state.selectedCategories,
  },
  mutations: {
    update(state, payload) {
      state.data = Object.entries(payload.data);
      state.browsers = Object.entries(payload.agents);
      state.categories = Object.entries(payload.cats);
    },
    setSelected(state, payload) {
      Object.assign(state, payload);
      if (Object.keys(payload)[0] === 'selectedBrowser') {
        state.selectedVersion = '';
      }
    },
    setCategories(state, payload) {
      const flattenArr = (arr) => {
        const newArr = [];
        for (let i = 0; i < arr.length; i += 1) {
          for (let x = 0; x < arr[i].length; x += 1) {
            newArr.push(arr[i][x]);
          }
        }
        return newArr;
      };
      state.selectedCategories = flattenArr(payload);
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
  },
});
