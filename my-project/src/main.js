import Vue from 'vue';
import App from './App.vue'; // componentのオブジェクトを返す
// Bootstrapを試用
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// BootstrapVue・BootstrapVueIconsを試用
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
// vue-router
import router from './router';
// vuex
import store from './store';

// BootstrapVueを試用
Vue.use(BootstrapVue)
// BootstrapVueIconsを試用
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
  router: router,
  store: store,
  render: h => h(App), // render関数を用い、仮想DOMを返す
  // render: function(h) {
  //   return h(App);
  // }
}).$mount('#app') // $mountメソッドで仮想DOMやその差分を実際のDOMに反映