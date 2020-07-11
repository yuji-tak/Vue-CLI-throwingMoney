<template>
  <div id="app">
    <Header />
    <LoginForm />
    <!-- vue-router -->
    <router-view></router-view>
    <Footer />
  </div>
</template>
<script>
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'
export default {
  components: {
    Header,
    LoginForm,
    Footer
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
