<template>
    <b-container>
        <b-row class="d-flex align-items-center mt-3">
            <b-col cols="12" class="text-left">
                <h3>ユーザ名</h3>
            </b-col>
        </b-row>
        <b-row v-for="user in users" :key="user.uid" class="mt-1">
            <template v-if="user.uid !== currentUserUid">
                <b-col cols="7" class="text-left">
                    <span>{{ user.displayName }}</span>
                </b-col>
                <b-col cols="3" class="text-right pr-0">
                    <b-button variant="info">
                        Walletを見る
                    </b-button>
                </b-col>
                <b-col cols="2" class="text-right send_style">
                    <b-button variant="info">
                        送る
                    </b-button>
                </b-col>
            </template>
        </b-row>
    </b-container>
</template>
<script>
import { db } from "../firebase";
export default {
    props: ['currentUserUid'],
    created() {
        // 初期表示用の静的リクエスト → users配列へ格納
        db.collection('users')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.users.push(doc.data())
                })
            });
    },
    data() {
        return {
            users: []
        }
    },
    computed: {
        sample() {
            return this.$store.state.user.uid
        }
    }
}
</script>
<style scoped>
.send_style {
    margin-left: -30px;
}
</style>