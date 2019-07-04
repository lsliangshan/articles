<template>
  <div id="app">
    <div class="view view-main view-init safe-areas"
         data-master-detail-breakpoint="800"
         data-url="/">
      <div class="page">
        <div class="navbar">
          <div class="navbar-inner">
            <div class="left">
              <a href="#"
                 class="link icon-only panel-open"
                 data-panel="left">
                <i class="icon f7-icons if-not-md">menu</i>
                <i class="icon material-icons md-only">menu</i>
              </a>
            </div>
            <div class="title sliding">INIG</div>
            <div class="right">
              <a class="link icon-only searchbar-enable"
                 data-searchbar=".searchbar-components">
                <i class="icon f7-icons if-not-md">search</i>
                <i class="icon material-icons md-only">search</i>
              </a>
            </div>
            <div class="title-large">
              <div class="title-large-text">INIG - 智愚</div>
            </div>
          </div>
        </div>
        <div data-infinite-distance="50"
             class="page-content infinite-scroll-content"
             @infinite="loadMore">
          <div class="block-title">Scroll bottom</div>
          <div class="list simple-list">
            <ul>
              <li v-for="(item, index) in items"
                  :key="index">Item {{item}}</li>
            </ul>
          </div>
          <div v-if="hasMoreItems"
               class="preloader infinite-scroll-preloader"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Framework7 from 'framework7'
  import routes from './routers'
  export default {
    name: 'App',
    components: {
    },
    data () {
      let theme = 'auto'
      if (document.location.search.indexOf('theme=') >= 0) {
        theme = document.location.search.split('theme=')[1].split('&')[0]
      }
      return {
        activeTab: 1,
        allowInfinite: true,
        hasMoreItems: true,
        lastItem: 20,
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        f7params: {
          root: '#app',
          routes,
          theme,
          name: 'Articles',
          id: 'com.dei2.articles'
        },
        app: null
      }
    },
    mounted () {
      this.$nextTick(() => {
        var app = this.app = new Framework7(this.f7params)
      })
    },
    methods: {
      loadMore: function () {
        console.log('>>>>>>>>>>>>>>>.')
        var self = this;

        var $ = self.$$;
        if (!self.allowInfinite) return;
        self.allowInfinite = false;

        setTimeout(function () {
          if (self.lastItem >= 200) {
            self.$setState({
              hasMoreItems: false,
            });
            return;
          }

          for (var i = 1; i <= 20; i++) {
            self.items.push(self.lastItem + i);
          }

          self.allowInfinite = true;

          self.$setState({
            lastItem: self.lastItem + 20,
            items: self.items,
          })
        }, 1000);
      }
    }
  }
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
  }
</style>
