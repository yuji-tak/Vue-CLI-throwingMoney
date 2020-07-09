<template>
    <b-container>
        <b-row>
            <b-col cols="12">
                <img alt="Vue logo" src="../assets/logo.png">
            </b-col>
            <b-col cols="12" v-if="currentDir === '/'">
                <h1 v-if="isSignUp && !isAuthenticated" class="text-center my-5" style="font-size: 1.5rem;">新規登録画面</h1>
                <h1 v-else class="text-center my-5" style="font-size: 1.5rem;">ログイン画面</h1>
            </b-col>    
        </b-row>
    </b-container>
</template>
<script>
export default {
    computed: {
        isSignUp() {
            return this.$store.state.isSignUp
        },
        currentDir() {
            return this.$route.path
        },
        isAuthenticated() {
            return this.$store.getters.isAuthenticated
        }
    }
}
</script>