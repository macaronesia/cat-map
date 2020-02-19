import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import cats from '@/store/modules/cats.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cats: cats
  },
  plugins: [
    createPersistedState({
      key: 'cat-map',
      paths: [
        'cats'
      ]
    })
  ],
  strict: true
});
