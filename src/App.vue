<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <router-view /> -->
    <f7-app :params="f7params">
      <f7-statusbar></f7-statusbar>
      <!-- <f7-view main
               url="/"
               :push-state="true"
               push-state-separator=""
               push-state-root=""
               class="safe-areas"
               :master-detail-breakpoint="800"></f7-view> -->
      <!-- <f7-view main
               url="/"
               :push-state="true"
               push-state-separator=""
               push-state-root="">
      </f7-view> -->
      <f7-page :page-content="false">
        <f7-toolbar bottom
                    tabbar>
          <f7-link v-for="(tab, index) in tabs"
                   :key="index"
                   :tab-link="'#' + tab.name"
                   :href="tab.path"
                   :route-tab-id="tab.name"
                   :tab-link-active="index === activeTab">{{tab.label}}</f7-link>
        </f7-toolbar>
        <f7-tabs routable>
          <f7-tab v-for="(tab, index) in tabs"
                  :key="index"
                  class="page-content"
                  :id="tab.name"
                  :tab-active="index === activeTab">
            <f7-view :url="tab.path"></f7-view>
          </f7-tab>
        </f7-tabs>
      </f7-page>
    </f7-app>
  </div>
</template>

<script>
import routes from './routers'
import { f7App, f7Statusbar, f7Views, f7View, f7Page, f7Toolbar, f7Navbar, f7Tabs, f7Tab, f7Link, f7Block } from 'framework7-vue'
export default {
  name: 'App',
  components: {
    f7App, f7Statusbar, f7Views, f7View, f7Page, f7Toolbar, f7Navbar, f7Tabs, f7Tab, f7Link, f7Block
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
        theme,
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
</style>
