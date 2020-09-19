import Vue from 'vue'
import App from './App.vue'
import router from './router';
import md from './directive/md';

Vue.config.productionTip = false

Vue.directive('md', md);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
