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
                        .then(res => {
                            dispatch('setUser', res.data());
                        })
                    })
                });
                commit('doSignUp');
        },
    }
});