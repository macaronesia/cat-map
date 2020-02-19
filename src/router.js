import Vue from 'vue';
import VueRouter from 'vue-router';

import CreateCat from '@/components/CreateCat.vue';
import Main from '@/components/Main.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Main
    },
    {
      path: '/create',
      component: CreateCat
    }
  ]
});
