<template>
    <b-container>
        <b-row class="d-flex align-items-center mt-3">
            <b-col cols="12" class="mt-3">
                <h1>ユーザ一覧</h1>
            </b-col>
            <b-col cols="12" class="text-left">
                <h3>ユーザ名</h3>
            </b-col>
        </b-row>
        <b-row v-for="(user, index) in users" :key="user.uid" class="mb-1">
            <template v-if="user.uid !== currentUserUid">
                <b-col sm="7" class="text-left">
                    <span>{{ user.displayName }}</span>
                </b-col>
                <b-col sm="3" class="d-sm-text-right pr-0">
                    <b-button id="show-btn" @click="showModalWallet(index)" variant="info">ウォレットを見る</b-button>
                </b-col>
                <b-col sm="2" class="d-sm-text-right send_style">
                    <b-button id="show-btn" @click="showModalSend(index)" variant="info">送る</b-button>
                </b-col>
            </template>
        </b-row>
        <!-- modal：wallet -->
        <b-modal ref="my-modal-wallet" centered hide-footer :title="`${displayName}さんのウォレット`">
            <div class="d-block text-center">
                <h3>￥{{ deposit }}</h3>
            </div>
            <b-button class="mt-3" variant="danger" block @click="hideModal">Close</b-button>
        </b-modal>
        <!-- modal：send -->
        <b-modal ref="my-modal-send" centered hide-footer :title="`あなたの残高： ￥${currentUserDeposit}`">
            <div class="d-block text-center">
                <h3>ギフトする金額</h3>
                <b-form-input v-model="throwingMoney"></b-form-input>
            </div>
            <b-button class="mt-3" variant="danger" block @click="sendMoney()">送信</b-button>
        </b-modal>
    </b-container>
</template>
<script>
import { db } from "../firebase";
import { mapActions } from 'vuex'
export default {
    props: ['currentUserUid', 'currentUserDeposit'],
    mounted() {
        // 初期表示用の静的リクエスト → users配列へ格納
        db.collection('users')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.users.push(doc.data())
                })
            });
        // 変化を検知する動的リクエスト
        db.collection('users')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    const doc = change.doc;
                    if (change.type === 'modified' && doc.data().uid !== this.currentUserUid) {
                        // currentUser以外に対する処理
                        this.users.splice(this.renderingIndex, 1, doc.data())
                    } else if (change.type === 'modified' && doc.data().uid === this.currentUserUid){
                        // currentUserに対する処理処理
                        this.setUser(doc.data())
                    }
                })
            })
    },
    data() {
        return {
            users: [],
            displayName: '',
            deposit: '',
            throwingMoney: '',
            renderingIndex: ''
        }
    },
    methods: {
        ...mapActions(['setUser']),
        showModalWallet(index) {
            this.$refs['my-modal-wallet'].show();
            // 表示する位置がレンダリング外にある為、下記の処理が必要
            this.displayName = this.users[index].displayName;
            this.deposit = this.users[index].deposit;
        },
        hideModal() {
            this.$refs['my-modal-wallet'].hide()
        },
        showModalSend(index) {
            this.$refs['my-modal-send'].show();
            this.renderingIndex = index;
        },
        sendMoney() {
            // 入力値の処理(半角数値のみ)
            const reg = new RegExp(/^[0-9]+$/)

            if (reg.test(this.throwingMoney)) {
                // currentUser以外に対する処理
                db
                .collection('users')
                .doc(this.users[this.renderingIndex].uid)
                .update({
                    deposit: Number(this.users[this.renderingIndex].deposit) + Number(this.throwingMoney)
                })
                .then(() => {
                    this.$refs['my-modal-send'].hide();
                    this.throwingMoney = '';
                })
                // currentUserに対する処理
                db
                .collection('users')
                .doc(this.currentUserUid)
                .update({
                    deposit: Number(this.currentUserDeposit) - Number(this.throwingMoney)
                })
            } else {
                return
            }
        }
    }
}
</script>
<style scoped>
@media screen and (min-width: 480px) {
    .send_style {
        margin-left: -30px;
        margin-top: 0;
    }
}
@media screen and (max-width: 479px) {
    .send_style {
        margin-top: 10px;
    }
}
</style>