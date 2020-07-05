<template>
    <div>
        <b-container>
            <b-row>
                <b-col cols="12">
                    <h1>dashboard</h1>
                </b-col>
                <b-col cols="12">
                    <b-button to="/" variant="info" @click.native="logout">
                        ログアウト
                    </b-button>
                </b-col>
                <b-col cols="12" class="mt-2 text-right">
                    <b-button to="/" variant="secondary">
                        戻る
                    </b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import { firebase } from "../firebase.js";

export default {
    methods: {
        logout() {
            firebase
            .auth()
            .signOut()
        }
    }
}
</script>