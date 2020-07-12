import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import DashBoard from './views/DashBoard.vue';

Vue.use(Router) // use：プラグインを適用する

export default new Router({
    mode: 'history', // hashを取り除く
    base: process.env.BASE_URL, // github公開用

    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/dashboard',
            component: DashBoard
        }
    ]
})