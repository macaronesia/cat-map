import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import 'leaflet/dist/leaflet.css';
import '@/assets/css/style.css';

import { Icon } from 'leaflet';
import Vue from 'vue';
import VueMaterial from 'vue-material';

import router from '@/router.js';
import store from '@/store/index.js';

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

Vue.use(VueMaterial);

new Vue({
  router: router,
  store: store
}).$mount('#app');
