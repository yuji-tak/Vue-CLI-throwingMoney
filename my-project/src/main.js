import Vue from 'vue';
import App from './App.vue'; // componentのオブジェクトを返す
// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// BootstrapVue・BootstrapVueIcons
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
// vue-router
import router from './router';
// vuex
import store from './store';

// BootstrapVue
Vue.use(BootstrapVue);
// BootstrapVueIcons
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App), // render関数を用い、仮想DOMを返す
  // render: function(h) {
  //   return h(App);
  // }
}).$mount('#app') // $mountメソッドで仮想DOMやその差分を実際のDOMに反映