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

// Firebase
import { firebase, db } from "./firebase";

// BootstrapVue
Vue.use(BootstrapVue);
// BootstrapVueIcons
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false;

// beforeEach()
router.beforeEach((to, from, next) => {
  // 確認用
  console.log('beforeEach');

  // ログイン中のユーザーを検知
  firebase.auth().onAuthStateChanged(loggedinUser => {
    if (loggedinUser) {                
        // Vuexへ更新されたデータを格納
        db.collection('users').doc(loggedinUser.uid).get()
        .then(res => {
            // actionsへアクセス
            store.commit('setUser', res.data());
        })
    } else {
      store.commit('setUser', null)
    }
  });
  next();
})

new Vue({
  router,
  store,
  render: h => h(App), // render関数を用い、仮想DOMを返す
  // render: function(h) {
  //   return h(App);
  // }
}).$mount('#app') // $mountメソッドで仮想DOMやその差分を実際のDOMに反映