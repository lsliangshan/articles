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
      <f7-list-button :color="activeThemeColor"
                      @click="signIn">登录</f7-list-button>
      <!-- <f7-block-footer>Some text about login information.<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</f7-block-footer> -->
    </f7-list>
  </f7-page>
</template>
<style scoped>
</style>
<script>
import { f7Page, f7LoginScreenTitle, f7List, f7ListInput, f7ListButton, f7BlockFooter } from 'framework7-vue'
import * as types from '../../store/mutation-types'
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
  computed: {
    store () {
      return this.$store
    },
    requestInfo () {
      return this.store.state.requestInfo
    },
    activeThemeColor () {
      return this.store.state.settings.activeThemeColor
    }
  },
  methods: {
    doLogin () {
      return new Promise(async (resolve, reject) => {
        await this.store.dispatch(types.AJAX, {
          url: this.requestInfo.login,
          data: {
            username: this.username,
            password: this.password
          }
        }).then(responseData => {
          console.log('登录：', responseData)
          if (responseData.status === 200 && responseData.data) {
            resolve(responseData.data)
          } else {
            this.$f7.toast.create({
              text: responseData.message || '操作失败，请稍后再试',
              position: 'top',
              closeTimeout: 3000
            }).open()
            resolve(null)
          }
        }).catch(err => {
          this.$f7.toast.create({
            text: (err.message.indexOf('timeout') > -1 ? '服务器响应超时，请稍后再试' : err.message),
            position: 'top',
            closeTimeout: 3000
          }).open()
          resolve(null)
        })
      })
    },
    async signIn () {
      if (!this.username) {
        this.$f7.toast.create({
          text: '用户名不能为空',
          position: 'top',
          closeTimeout: 3000
        }).open()
      } else if (!this.password) {
        this.$f7.toast.create({
          text: '密码不能为空',
          position: 'top',
          closeTimeout: 3000
        }).open()
      } else {
        this.doLogin().then(responseData => {
          if (responseData) {
            // 登录成功
            this.$f7.toast.create({
              text: '登录成功',
              position: 'top',
              closeTimeout: 3000
            }).open()
            this.store.commit(types.CACHE_LOGIN_INFO, {
              loginInfo: responseData
            })
            setTimeout(() => {
              this.$f7router.back()
            }, 800)
          } else {
            // 登录失败
          }
        })
      }
      // this.$f7.dialog.alert(`Username: ${this.username}<br>Password: ${this.password}`)
    }
  }
}
</script>

