<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <router-view /> -->
    <f7-app :params="f7params"
            class=" color-purple">
      <f7-statusbar></f7-statusbar>
      <f7-panel left
                reveal
                class=" panel-reveal">
        <f7-view>
          <f7-page>
            <!-- <f7-navbar title="Left Panel"></f7-navbar> -->
            <f7-block>
              <p>Here comes the left panel text</p>
            </f7-block>
          </f7-page>
        </f7-view>
      </f7-panel>
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
  import { f7App, f7Statusbar, f7Panel, f7Page, f7Views, f7View, f7Toolbar, f7Navbar, f7Tabs, f7Tab, f7Link, f7Block } from 'framework7-vue'
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
          theme: 'ios',
          name: 'Articles',
          id: 'com.dei2.articles',
          // panel: {
          //   swipe: 'both',
          // },
          panels3d: {
            enabled: true
          }
        }
      }
    }
  }
</script>

<style>
  body {
    background: #074d55;
    background: -moz-radial-gradient(
      center,
      ellipse cover,
      #a7cfdf 0%,
      #23538a 100%
    ); /* FF3.6+ */
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
      rgba(10, 81, 15, 0.6) 0%,
      rgba(10, 81, 15, 0.9) 50%,
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

  .panel .page,
  .panel {
    background: none;
  }
  .panel .list ul {
    background: none;
    border: none;
  }
  .panel .list .item-link {
    color: #fff;
  }
  .panel .list .item-link.active-state {
    background: rgba(255, 255, 255, 0.2);
  }
  .panel .list .item-inner {
    border-bottom-color: rgba(255, 255, 255, 0.2);
  }
  .panel .block,
  .panel .block-title {
    color: #fff;
  }
</style>
