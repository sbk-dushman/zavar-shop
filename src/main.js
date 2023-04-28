import Vue from 'vue';
import App from './App.vue';
import getString from './utils';
import { firstName, lastName } from './constants';

Vue.config.productionTip = false;

getString(1, firstName);

getString(2, lastName);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
