import Vue from 'vue';
import Vuex from 'vuex';
// Firebase
import { firebase, db } from "./firebase";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isSignUp: true,
        user: ''
    },
    getters: {
        isAuthenticated: state => !!state.user,
    },
    mutations: {
        doSignUp(state) {
            state.isSignUp = !state.isSignUp;
        },
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        doSignUp({ commit }) {
            commit('doSignUp')
        },
        setUser({ commit }, user) {
            commit('setUser', user);
        },
        signUp({ commit, dispatch }, authData) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(authData.email, authData.password)
                .then(result => {
                    const user = result.user;
                    // ユーザー名の登録
                    user.updateProfile({
                        displayName: authData.name
                    })
                    .then(() => {
                        // dbで新規ドキュメントを作成
                        db.collection('users').doc(user.uid).set({
                            uid: user.uid,
                            displayName: user.displayName,
                            deposit: 1000
                        })
                    })
                    .then(() => {
                        // dbで新規作成されたデータを反映
                        db.collection('users').doc(user.uid).get()
                        .then(result => {
                            dispatch('setUser', result.data());
                        })
                    })
                })
                .catch(error => {
                    console.log(error);
                });
            // commitとdispatchを使い分ける為に使用
            commit('doSignUp');
        },
        login({ dispatch }, authData) {
            firebase
                .auth()
                .signInWithEmailAndPassword(authData.email, authData.password)
                .then(() => {
                    dispatch('doSignUp');
                })
                .catch(error => {
                    console.log(error);
                });
        },
        reSignUp({ dispatch }) {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    dispatch('doSignUp');
                    // logout()ではページ遷移を伴う処理を行っているので、setUserを更新する必要はない
                    dispatch('setUser', null);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        logout() {
            firebase
                .auth()
                .signOut()
                .catch(error => {
                    console.log(error);
                });
        },
    }
});