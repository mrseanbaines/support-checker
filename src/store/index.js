import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    all: null,
  },
  getters: {
    all: state => state.all,
  },
  mutations: {
    update(state, data) {
      state.all = data;
    },
  },
  actions: {
    fetch({ commit }) {
      Vue.http.get('https://jsonplaceholder.typicode.com/posts/1').then(
        (response) => {
          /* eslint-disable-next-line no-console */
          console.log(response.body);
          commit('update', response.body);
        },
      );
    },
  },
});
