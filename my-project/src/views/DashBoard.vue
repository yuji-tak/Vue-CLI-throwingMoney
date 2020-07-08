<template>
    <b-container>
        <b-row class="align-items-center">
            <b-col cols="12">
                <h1>dashboard</h1>
            </b-col>
            <b-col cols="12">
                <b-button to="/" variant="info" @click.native="logout">
                    ログアウト
                </b-button>
            </b-col>

            <!-- 確認用 -->
            <b-col cols="6" class="mt-2 text-left">
                <span class="mr-2">{{ message }}</span>
            </b-col>
            <b-col cols="6" class="mt-2 text-right">
                <b-button to="/" variant="secondary">
                    戻る
                </b-button>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import { firebase } from "../firebase.js";
import { mapActions } from 'vuex'

export default {
    created() {
      // 認証状態の変更検知
      firebase
      .auth()
      .onAuthStateChanged(user => {
        if (user) { 
            this.message = 'ログイン中';
        }
      });
    },
    data() {
        return {
            message: '',
        }
    },
    methods: {
        ...mapActions(['setUser']),
        logout() {
            firebase
            .auth()
            .signOut()
            .then(() => {
                this.setUser(null);
                console.log('logout成功');
            })
            .catch(error => {
                console.log(error);
            })
        },
    }
}
</script>