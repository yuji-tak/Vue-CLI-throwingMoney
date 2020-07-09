<template>
    <b-container v-if="currentDir === '/'">
        <!-- 入力フォーム -->
        <b-row class="w-75 m-auto">
            <b-col v-if="isSignUp && !isAuthenticated" sm="4" class="d-flex align-items-center pr-0 mb-2">
                <label class="m-0">ユーザー名</label>
            </b-col>
            <b-col v-if="isSignUp && !isAuthenticated" sm="8" class="mb-2">
                <b-form-input v-model="name"></b-form-input>
            </b-col>
            <b-col sm="4" class="d-flex align-items-center pr-0 mb-2">
                <label class="m-0">メールアドレス</label>
            </b-col>
            <b-col sm="8" class="mb-2">
                <b-form-input v-model="email"></b-form-input>
            </b-col>
            <b-col sm="4" class="d-flex align-items-center pr-0 mb-2">
                <label class="m-0">パスワード</label>
            </b-col>
            <b-col sm="8" class="mb-2">
                <b-form-input v-model="password"></b-form-input>
            </b-col>
        </b-row>
        <!-- ボタン -->
        <b-row>
          <b-col cols="12">
            <b-button to="/dashboard" v-if="isSignUp" variant="info" @click.native="signUp">
              新規登録
            </b-button>
            <b-button to="/dashboard" v-else variant="info" @click.native="login">
              ログイン
            </b-button>
            <router-link to="/dashboard" v-if="!isAuthenticated" @click.native="login" class="d-block mt-1">ログインはこちらから</router-link>
            <router-link to="/" v-else @click.native="reSignUp" class="d-block mt-1" style="cursor: pointer;">新規登録はこちらから</router-link>
          </b-col>
        </b-row>
      </b-container>
</template>
<script>
import { firebase } from "../firebase";
import { mapActions } from "vuex";

export default {
    data() {
        return {
            // 入力情報
            name: '',
            email: '',
            password: '',
        }
    },
    computed: {
        currentDir() {
            return this.$route.path
        },
        isSignUp() {
            return this.$store.state.isSignUp
        },
        isAuthenticated() {
            return this.$store.getters.isAuthenticated
        }
    },
    methods: {
        ...mapActions(['doSignUp', 'setUser']),
        // 新規登録
        signUp() {
            firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(result => {
                const user = result.user;
                this.setUser(user);
                // ユーザー名の登録
                return user.updateProfile({
                    displayName: this.name
                });
            })
            .then(() => {
                this.doSignUp();
                this.name = '';
                this.email = '';
                this.password = '';
            })
            .catch(error => {
                console.log(error);
            });
        },
        // ログイン
        login() {
            firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(result => {
                this.doSignUp();
                const user = result.user;
                this.setUser(user);
            })
            .then(() => {
                this.email = '',
                this.password = ''
            })
            .catch(error => {
                console.log(error);
            });
        },
        // 再新規登録
        reSignUp() {
            firebase
            .auth()
            .signOut()
            .then(() => {
                this.doSignUp();
                this.setUser(null);
            })
            .catch(error => {
                console.log(error);
            })
        },
    }
}
</script>