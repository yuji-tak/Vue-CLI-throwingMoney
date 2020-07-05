<template>
  <div id="app">
    <div>

      <b-container>
        <b-row>
          <b-col cols="12">
            <img alt="Vue logo" src="./assets/logo.png">
          </b-col>
          <b-col cols="12" v-if="this.$route.path === '/'">
            <h1 v-if="doSignUp && !isLoggedIn" class="text-center my-5" style="font-size: 1.5rem;">新規登録画面</h1>
            <h1 v-else class="text-center my-5" style="font-size: 1.5rem;">ログイン画面</h1>
          </b-col>    
        </b-row>
      </b-container>

      <b-container v-if="this.$route.path === '/'">
        <!-- Form -->
        <template v-if="doSignUp">
          <b-row class="w-75 m-auto">
            <b-col sm="4" class="d-flex align-items-center pr-0 mb-2">
              <label for="" class="m-0">ユーザー名</label>
            </b-col>
            <b-col sm="8" class="mb-2">
              <b-form-input v-model="name"></b-form-input>
            </b-col>
          </b-row>
        </template>
        <b-row class="w-75 m-auto">
          <b-col sm="4" class="d-flex align-items-center pr-0 mb-2">
            <label for="" class="m-0">メールアドレス</label>
          </b-col>
          <b-col sm="8" class="mb-2">
            <b-form-input v-model="email"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="w-75 m-auto">
          <b-col sm="4" class="d-flex align-items-center pr-0 mb-2">
            <label for="" class="m-0">パスワード</label>
          </b-col>
          <b-col sm="8" class="mb-2">
            <b-form-input v-model="password"></b-form-input>
          </b-col>
        </b-row>
        <!-- Button -->
        <b-row>
          <b-col cols="12">
            <b-button to="/dashboard" v-if="doSignUp" variant="info" @click.native="signUp">
              新規登録
            </b-button>
            <b-button to="/dashboard" v-if="!doSignUp" variant="info" @click.native="login">
              ログイン
            </b-button>
            <router-link to="/dashboard" v-if="!isLoggedIn" @click.native="login" class="d-block mt-1">ログインはこちらから</router-link>
            <router-link to="/" v-if="isLoggedIn" @click.native="logout" class="d-block mt-1" style="cursor: pointer;">新規登録はこちらから</router-link>
          </b-col>
        </b-row>
        <!-- Footer -->
        <b-row class="mt-5">
          <b-col sm="12">Copyright&copy; tak Inc. All rights reserved.</b-col>
        </b-row>
      </b-container>

      <!-- 確認用 -->
      <!-- <div v-if="this.$route.path === '/'"> -->
      <div>
        <p class="mt-3 text-danger">Message：{{ message }}</p>
        <p class="text-danger">ログイン状態： {{ loginMessage }} </p>
        <p class="text-danger">{{ displayedName }}さん、こんにちは！</p>
      </div>

    </div>
    <!-- vue-router -->
    <router-view></router-view>
  </div>
</template>

<script>
import { firebase } from "./firebase.js";

export default {
  data() {
    return {
      // 状態管理
      doSignUp: true,
      isLoggedIn: false,
      message: 'Nothing',
      loginMessage: '',
      displayedName: '',
      // 入力情報
      name: '',
      email: '',
      password: '',
    }
  },
  created() {
    // 認証状態の変更検知
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.loginMessage = user.email + "\n is signed in";
        this.displayedName = user.displayName;
        this.doSignUp = false;
        this.isLoggedIn = true;
      } else {
        this.loginMessage = 'No user is signed in';
        this.displayedName = '';
      }
    });
  },
  methods: {
    // 新規登録
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(r => {
          // ユーザー名の登録
          return r.user.updateProfile({
            displayName: this.name
          });
        })
        .then(() => {
          this.displayedName = this.name;
          this.name = '';
          this.email = '';
          this.password = '';
          this.message = 'signUp successful!'
        })
        .catch(error => {
          this.message = error.code + '\n' + error.message;
        });
    },
    // ログイン
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.email = '',
          this.password = '',
          this.doSignUp = false,
          this.isLoggedIn = true,
          this.message = 'login successful!'
        })
        .catch(error => {
          this.message = error.code + '\n' + error.message;
        });
    },
    // ログアウト
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.message = 'Sign-out successful.';
          this.displayedName = '';
          this.doSignUp = true;
          this.isLoggedIn = false;
        })
        .catch(error => {
          this.message = error.code + '\n' + error.message;
        })
    },
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
