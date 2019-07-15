<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <router-view /> -->
    <f7-app :params="f7params"
            :class="'color-' + activeThemeColor">
      <f7-statusbar></f7-statusbar>
      <f7-panel left
                cover
                resizable
                style="min-width: 240px;">
        <f7-view url="/profile"
                 links-view=".view-main">
          <!-- <f7-page>
            <f7-view :main="false"
                     url="/profile"></f7-view>
          </f7-page> -->
        </f7-view>
      </f7-panel>
      <f7-view :main="true"
               url="/"
               :push-state="true"
               push-state-separator=""></f7-view>

    </f7-app>
  </div>
</template>

<script>
  import routes from './routers'
  import { f7App, f7Statusbar, f7Panel, f7Page, f7Views, f7View, f7Toolbar, f7Navbar, f7Tabs, f7Tab, f7Link, f7Block } from 'framework7-vue'
  import * as types from './store/mutation-types'
  import { StorageUtil } from './utils'
  const CryptoJS = require('crypto-js')
  export default {
    name: 'App',
    components: {
      f7App, f7Statusbar, f7Panel, f7Page, f7Views, f7View, f7Toolbar, f7Navbar, f7Tabs, f7Tab, f7Link, f7Block
    },
    data () {
      let theme = 'auto'
      if (document.location.search.indexOf('theme=') >= 0) {
        theme = document.location.search.split('theme=')[1].split('&')[0]
      }
      return {
        activeTab: 1,
        tabs: [
          {
            label: '发布',
            name: 'publish',
            path: '/'
          },
          {
            label: '文章',
            name: 'article',
            path: '/'
          },
          {
            label: '我的',
            name: 'profile',
            path: '/'
          }
        ],
        f7params: {
          routes,
          fastClicks: true,
          theme: 'ios',
          name: 'Articles',
          id: 'com.dei2.articles',
          // panel: {
          //   swipe: 'both',
          // },
          // panels3d: {
          //   enabled: true
          // }
        },
        activeThemeColor: 'primary'
      }
    },
    computed: {
      store () {
        return this.$store
      },
      localStorageKeys () {
        return this.store.state.localStorageKeys
      },
      themeColors () {
        return this.store.state.themeColors
      }
    },
    created () {
      this.activeThemeColor = this.getActiveThemeColor()
      this.store.commit(types.CACHE_ACTIVE_THEME_COLOR, {
        activeThemeColor: this.activeThemeColor
      })
      let localLoginInfo = StorageUtil.getItem(this.localStorageKeys.loginInfo)
      this.initLoginInfo(localLoginInfo)
    },
    mounted () {
      window.addEventListener('storage', this.storeChangeHandler)
      this.$f7ready((f7) => {
        global.app = f7
      })
    },
    methods: {
      getActiveThemeColor () {
        let date = (new Date()).getDate()
        let index = Math.floor(Math.random() * 14) // date % (this.themeColors.length + 1)
        return index !== 13 ? this.themeColors[index].name : 'primary'
      },
      initLoginInfo (localLoginInfo) {
        if (localLoginInfo) {
          let decodedLoginInfo = this.decodeLoginInfo(localLoginInfo)
          if (decodedLoginInfo) {
            this.store.commit(types.INIT_LOGIN_INFO, {
              loginInfo: JSON.parse(decodedLoginInfo)
            })
          } else {
            StorageUtil.clear()
            this.store.commit(types.INIT_LOGIN_INFO, {
              loginInfo: {}
            })
          }
        }
      },
      decodeLoginInfo (localLoginInfo) {
        let decodedLoginInfo
        try {
          decodedLoginInfo = CryptoJS[this.store.state.cryptoType].decrypt(localLoginInfo, this.store.state.privateKey).toString(CryptoJS.enc.Utf8)
        } catch (err) { }
        return decodedLoginInfo
      },
      storeChangeHandler (e) {
        if (e.key === this.localStorageKeys.loginInfo) {
          let loginInfo = this.decodeLoginInfo(e.newValue)
          this.store.commit(types.CACHE_LOGIN_INFO, {
            loginInfo: JSON.parse(loginInfo),
            localStr: e.newValue
          })
        }
      }
    }
  }
</script>

<style>
  .body_bak {
    background: #074d55;
    background: -moz-radial-gradient(
      center,
      ellipse cover,
      #a7cfdf 0%,
      #23538a 100%
    );
    background: -webkit-gradient(
      radial,
      right bottom,
      0px,
      left top,
      100%,
      color-stop(0%, #6967a5),
      color-stop(50%, #2075a1),
      color-stop(100%, #074d55)
    );
    background: -webkit-radial-gradient(
      right bottom,
      ellipse cover,
      #6967a5 0%,
      #2075a1 50%,
      #074d55 100%
    );
    background: radial-gradient(
      ellipse at right bottom,
      rgba(10, 81, 15, 0.75) 0%,
      rgba(10, 81, 15, 0.8) 50%,
      rgba(10, 81, 15, 1) 100%
    );
  }
  /* #6967a5 0%, #2075a1 50%, #074d55 100% */
  .card-content-padding {
    font-size: 16px;
  }
  .card-content-padding pre {
    overflow-x: auto !important;
  }
  .card-content-padding img {
    max-width: 100%;
  }
  .panel-backdrop {
    background-color: rgba(0, 0, 0, 0.4);
  }
</style>
