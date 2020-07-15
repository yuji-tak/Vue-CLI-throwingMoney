<template>
    <div>
        <!-- 使用中のユーザー -->
        <b-container>
            <b-row class="d-flex align-items-center mt-3">
                <template v-if="currentUser">
                    <b-col sm="6" class="text-left">
                        <span>{{ currentUserName }} さん、ようこそ！！！</span>
                    </b-col>
                    <b-col sm="3" class="text-right">
                        <span>残高： ￥{{ currentUserDeposit }}</span>
                    </b-col>
                    <b-col sm="3" class="text-right">
                        <b-button to="/" variant="outline-info" @click.native="logout">
                            ログアウト
                        </b-button>
                    </b-col>
                </template>
                <template v-else>
                    <b-col cols="12" class="mt-3">
                        <h4>Loading…</h4>
                    </b-col>
                </template>
            </b-row>
        </b-container>
        <!-- 登録中のユーザー -->
        <!-- ※詳細別途 このv-ifがないと、エラー発生-->
        <template v-if="currentUser">
            <LoggedinUsers :currentUserUid="currentUserUid" :currentUserDeposit="currentUserDeposit" />
        </template>
    </div>
</template>
<script>
import LoggedinUsers from '../components/LoggedinUsers'
import { firebase, db } from "../firebase";
import { mapActions } from 'vuex'
export default {
    components: {
        LoggedinUsers
    },
    mounted() {
        // ログイン中のユーザーを検知
        firebase.auth().onAuthStateChanged(loggedinUser => {
            if (loggedinUser) {                    
                // Vuexへ更新されたデータを格納
                db.collection('users').doc(loggedinUser.uid).get()
                .then(res => {
                    this.setUser(res.data());
                })
            }
        });
    },
    computed: {
        currentUser() {
            return this.$store.state.user
        },
        currentUserName() {
            return this.$store.state.user.displayName
        },
        currentUserDeposit() {
            return this.$store.state.user.deposit
        },
        currentUserUid() {
            return this.$store.state.user.uid
        }
    },
    methods: {
        ...mapActions(['setUser']),
        // ログアウト
        logout() {
            firebase
            .auth()
            .signOut()
            .then(() => {
                this.setUser(null);
            })
            .catch(error => {
                console.log(error);
            })
        },
    }
}
</script>