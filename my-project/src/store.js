import Vue from 'vue';
import Vuex from 'vuex';

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
        }
    }
});