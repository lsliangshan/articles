<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <router-view /> -->
    <f7-app :params="f7params"
            class=" color-purple">
      <f7-statusbar></f7-statusbar>
      <f7-view :main="true"
               url="/"
               class="safe-areas"
               :push-state="true"
               push-state-separator=""
               push-state-root=""
               :master-detail-breakpoint="800"></f7-view>
    </f7-app>
  </div>
</template>

<script>
  import routes from './routers'
  import { f7App, f7Statusbar, f7Views, f7View, f7Toolbar, f7Navbar, f7Tabs, f7Tab, f7Link, f7Block } from 'framework7-vue'
  export default {
    name: 'App',
    components: {
      f7App, f7Statusbar, f7Views, f7View, f7Toolbar, f7Navbar, f7Tabs, f7Tab, f7Link, f7Block
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
          theme: 'md',
          name: 'Articles',
          id: 'com.dei2.articles'
        }
      }
    }
  }
</script>

<style>
  #app {
    /* font-family: "Avenir", Helvetica, Arial, sans-serif;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    text-align: center;
                    color: #2c3e50;
                    margin-top: 60px; */
  }
  .card-content-padding {
    font-size: 16px;
  }
  .card-content-padding pre {
    overflow-x: auto !important;
  }
  .card-content-padding img {
    max-width: 100%;
  }
</style>
