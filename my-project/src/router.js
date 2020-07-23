import Vue from 'vue';
import Router from 'vue-router';
import { firebase, db } from "./firebase";
// vuex
import store from './store';

import Home from './views/Home.vue';
import DashBoard from './views/DashBoard.vue';

Vue.use(Router) // use：プラグインを適用する

const router = new Router({
    mode: 'history', // hashを取り除く
    base: process.env.BASE_URL, // github公開用

    routes: [
        {
            path: '/',
            component: Home,
        },
        {
            path: '/dashboard',
            component: DashBoard,
            beforeEnter(to, from, next) {
                firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                        console.log('router.js');
                        next();
                    } else {
                        next('/')
                    }
                })
            }
        }
    ]
})

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

export default router;