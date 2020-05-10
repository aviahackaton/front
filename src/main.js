import Vue from 'vue';
import App from './App.vue';

import YmapPlugin from 'vue-yandex-maps';

import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

Vue.config.productionTip = false;

Vue.use(Buefy, {
  defaultIconPack: 'fas'
});
Vue.use(YmapPlugin);

new Vue({
  render: h => h(App)
}).$mount('#app');
