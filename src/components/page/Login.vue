<template>
  <f7-page no-toolbar
           no-navbar
           no-swipeback
           login-screen>
    <!-- <f7-login-screen-title>登录</f7-login-screen-title> -->
    <f7-list form>
      <f7-list-input label="用户名"
                     type="text"
                     placeholder="您的用户名"
                     :value="username"
                     autocomplete="username"
                     @input="username = $event.target.value"></f7-list-input>
      <f7-list-input label="密码"
                     type="password"
                     placeholder="您的密码"
                     :value="password"
                     autocomplete="current-password"
                     @input="password = $event.target.value"></f7-list-input>
    </f7-list>
    <f7-list>
      <f7-list-button @click="signIn">登录</f7-list-button>
      <f7-block-footer>Some text about login information.<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</f7-block-footer>
    </f7-list>
  </f7-page>
</template>
<style scoped>
</style>
<script>
  import { f7Page, f7LoginScreenTitle, f7List, f7ListInput, f7ListButton, f7BlockFooter } from 'framework7-vue'
  export default {
    name: 'Login',
    components: {
      f7Page, f7LoginScreenTitle, f7List, f7ListInput, f7ListButton, f7BlockFooter
    },
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      signIn () {
        this.$f7.dialog.alert(`Username: ${this.username}<br>Password: ${this.password}`)
      }
    }
  }
</script>

