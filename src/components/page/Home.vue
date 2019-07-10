<template>
  <f7-page name="home"
           class="home-page"
           infinite
           :infinite-distance="0"
           :infinite-preloader="showPreloader"
           @infinite="loadMore"
           ptr
           @ptr:refresh="refresh"
           @ptr:pullstart="pullStart"
           @ptr:done="pullEnd">
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-only
                 :icon-size="24"
                 icon-ios="f7:person_round"
                 icon-aurora="f7:person_round"
                 icon-md="f7:person_round"
                 panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>INIG</f7-nav-title>
      <!-- <f7-nav-title-large>INIG - 智愚</f7-nav-title-large> -->
      <f7-nav-right>
        <f7-link class="searchbar-enable"
                 data-searchbar=".searchbar-components"
                 icon-ios="f7:search"
                 icon-aurora="f7:search"
                 icon-md="f7:search"></f7-link>
      </f7-nav-right>
      <f7-searchbar class="searchbar-components"
                    ref="searchBarRef"
                    custom-search
                    disable-button-text="取消"
                    placeholder="请输入文章"
                    expandable
                    :disable-button="!$theme.aurora"
                    @searchbar:search="doSearch"
                    @searchbar:enable="searchEnable"
                    @searchbar:disable="searchDisable"></f7-searchbar>
    </f7-navbar>
    <search-list :kw="kw"></search-list>
    <!-- <f7-page-content> -->
    <article-item v-for="(item, index) in articles"
                  :key="index"
                  :index="index"
                  :detail="item">
    </article-item>
    <!-- </f7-page-content> -->

    <transition name="fab-button-transition"
                enter-active-class="animated fadeInUpBig faster"
                leave-active-class="animated fadeOut faster">
      <f7-fab position="right-bottom"
              style="position: fixed;"
              color="orange"
              v-if="fabButtonShown">
        <f7-link icon-only
                 :icon-size="24"
                 icon-ios="f7:person"
                 icon-aurora="f7:person"
                 icon-md="f7:person"
                 color="white"
                 panel-open="left"></f7-link>
        <!-- <f7-icon ios="f7:close"
                 aurora="f7:close"
                 md="md:close"></f7-icon> -->
        <!-- <f7-fab-buttons position="top">
          <f7-fab-button label="Action 1">1</f7-fab-button>
          <f7-fab-button label="Action 2">2</f7-fab-button>
        </f7-fab-buttons> -->
      </f7-fab>
    </transition>
  </f7-page>

</template>
<style scoped>
  .home-page {
    -webkit-user-select: none;
  }
</style>
<script>
  import { f7Statusbar, f7View, f7Page, f7PageContent, f7Fab, f7Icon, f7FabButtons, f7Button, f7Navbar, f7NavRight, f7Toolbar, f7Tabs, f7Tab, f7Link, f7Block, f7List, f7ListItem, f7Searchbar } from 'framework7-vue'
  import ArticleItem from '../parts/article/Item.vue'
  import SearchList from '../parts/search/List.vue'
  import * as types from '../../store/mutation-types'
  export default {
    name: 'PageHome',
    components: {
      ArticleItem,
      SearchList,
      f7Statusbar, f7View, f7Page, f7PageContent, f7Fab, f7Icon, f7FabButtons, f7Button, f7Navbar, f7NavRight, f7Toolbar, f7Tabs, f7Tab, f7Link, f7Block, f7List, f7ListItem, f7Searchbar
    },
    data () {
      return {
        allowInfinite: true,
        showPreloader: true,
        pageIndex: 1,
        pageSize: 20,
        articles: [],
        defaultArticleDetail: null,
        isOpen: false,
        isSearching: false,
        kw: '',
        fabButtonShown: false
      }
    },
    computed: {
      store () {
        return this.$store
      },
      requestInfo () {
        return this.store.state.requestInfo
      },
      allArticleTags () {
        return this.store.state.allArticleTags
      }
    },
    async mounted () {
      // this.$f7ready((f7) => {
      // })

      this.loadMore()
      // this.$nextTick(() => {
      //   console.log('>>>>>>>>>', this.$refs.searchBarRef)
      //   this.$refs.searchBarRef.$el.setAttribute('action', 'javascript:return true')
      // })
      // this.$refs.searchBarRef.$el.addEventListener('submit', () => {
      //   alert('submit')
      // })
      this.getAllArticleTags()

      this.$nextTick(() => {
        setTimeout(() => {
          this.fabButtonShown = true
        }, 2000)
      })
    },
    methods: {
      scrollToTop () {
        setTimeout(() => {
          this.$$('.page-content').scrollTop(53, 300)
        }, 2000)
      },
      getArticles () {
        return new Promise(async (resolve, reject) => {
          await this.store.dispatch(types.AJAX, {
            url: this.requestInfo.articles.list,
            data: {
              pageIndex: this.pageIndex,
              pageSize: this.pageSize
            }
          }).then(responseData => {
            console.log('list: ', responseData)
            if (responseData.status === 200 && responseData.data && responseData.data.list) {
              resolve(responseData.data)
            } else {
              this.$f7.toast.create({
                text: '服务器响应超时，请稍后再试',
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
      getAllArticleTags () {
        return new Promise(async (resolve, reject) => {
          await this.store.dispatch(types.AJAX, {
            url: this.requestInfo.articles.getAllTags
          }).then(responseData => {
            if (responseData.status === 200 && responseData.data && responseData.data.list) {
              this.store.commit(types.CACHE_ALL_ARTICLE_TAGS, {
                tags: responseData.data.list
              })
              resolve(responseData.data.list)
            } else {
              resolve(null)
            }
          }).catch(err => {
            resolve(null)
          })
        })
      },
      async loadMore () {
        if (this.allowInfinite) {
          this.allowInfinite = false

          let responseData = await this.getArticles()
          if (responseData) {
            if (this.pageIndex === 1) {
              this.articles = responseData.list
            } else {
              this.articles = this.articles.concat(responseData.list)
              this.$f7.toast.create({
                text: responseData.list.length > 0 ? `为您推荐${responseData.list.length}条文章` : '暂无新文章推荐',
                position: 'top',
                closeTimeout: 3000
              }).open()
            }
            if (this.pageIndex < responseData.total) {
              this.pageIndex += 1
              this.allowInfinite = true
            } else {
              this.allowInfinite = false
              this.showPreloader = false
            }
          } else {
            this.allowInfinite = true
          }
        } else {
          this.showPreloader = false
        }
      },
      async refresh (e, done) {
        if (this.isSearching) {
          done()
          return
        }
        this.pageIndex = 1
        this.articles = []
        this.allowInfinite = true
        await this.loadMore()
        setTimeout(() => {
          this.$f7.toast.create({
            text: '刷新成功',
            position: 'top',
            closeTimeout: 3000
          }).open()
          done()
        }, 800)
      },
      pullStart () {
        this.showPreloader = false
      },
      pullEnd () {
        this.showPreloader = true
      },
      searchChanged (e) {
        this.kw = e.target.value
      },
      disableChange (e) {
        this.kw = ''
      },
      doSearch (searchbar, query) {
        this.kw = query
      },
      searchEnable () {
        this.isSearching = true
      },
      searchDisable () {
        this.isSearching = false
      }
    }
  }
</script>
