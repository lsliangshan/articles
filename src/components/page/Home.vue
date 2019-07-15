<template>
  <f7-page name="home"
           class="home-page"
           with-subnavbar
           infinite
           :infinite-distance="0"
           :infinite-preloader="showPreloader"
           @infinite="loadMore"
           ptr
           @ptr:refresh="refresh"
           @ptr:pullstart="pullStart"
           @ptr:done="pullEnd">
    <f7-navbar>
      <!-- <f7-nav-left>
        <f7-link icon-only
                 :icon-size="24"
                 icon-ios="f7:person_round"
                 icon-aurora="f7:person_round"
                 icon-md="f7:person_round"
                 panel-open="left"></f7-link>
      </f7-nav-left> -->
      <f7-nav-title>INIG</f7-nav-title>
      <!-- <f7-nav-title-large>INIG - 智愚</f7-nav-title-large> -->
      <!-- @searchbar:enable="searchEnable"
                      @searchbar:disable="searchDisable" -->
      <!-- <f7-nav-right>
        <f7-link class="searchbar-enable"
                 data-searchbar=".searchbar-components"
                 icon-ios="f7:search"
                 icon-aurora="f7:search"
                 icon-md="f7:search"></f7-link>
      </f7-nav-right> -->
      <f7-subnavbar :inner="false">
        <f7-searchbar class="searchbar-components color-theme-red"
                      ref="searchBarRef"
                      disable-button-text="取消"
                      placeholder="请输入文章"
                      :value="kw"
                      custom-search
                      :backdrop="!!kw.match(/^[#@]/)"
                      :disable-button="!$theme.aurora"
                      @click:clear="searchClear"
                      @searchbar:search="search"></f7-searchbar>
      </f7-subnavbar>
    </f7-navbar>
    <search-list :kw="kw"
                 :is-searching="isSearching"
                 @change="changeKw"></search-list>
    <f7-row no-gap
            class="pt10">
      <f7-col v-for="(item, index) in articles"
              :key="index"
              width="100"
              tablet-width="50"
              desktop-width="33">
        <article-item :index="index"
                      :detail="item">
        </article-item>
      </f7-col>
    </f7-row>
    <!-- <article-item v-for="(item, index) in articles"
                  :key="index"
                  :index="index"
                  :detail="item">
    </article-item> -->

    <transition name="fab-button-transition"
                enter-active-class="animated fadeInUpBig faster"
                leave-active-class="animated fadeOut faster">
      <f7-fab position="right-bottom"
              style="position: fixed;"
              :color="activeThemeColor"
              v-if="fabButtonShown">
        <f7-link icon-only
                 :icon-size="24"
                 icon-ios="f7:person"
                 icon-aurora="f7:person"
                 icon-md="f7:person"
                 color="white"
                 panel-open="left"></f7-link>
      </f7-fab>
    </transition>
  </f7-page>

</template>
<style scoped>
.home-page {
  -webkit-user-select: none;
}
.pt10 {
  padding-top: 10px;
}
</style>
<script>
import { f7Page, f7Fab, f7Navbar, f7Subnavbar, f7NavRight, f7Link, f7Searchbar, f7Row, f7Col } from 'framework7-vue'
import ArticleItem from '../parts/article/Item.vue'
import SearchList from '../parts/search/List.vue'
import * as types from '../../store/mutation-types'
export default {
  name: 'PageHome',
  components: {
    ArticleItem,
    SearchList,
    f7Page, f7Fab, f7Navbar, f7Subnavbar, f7NavRight, f7Link, f7Searchbar, f7Row, f7Col
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
      cachedKw: '',
      searchType: '',
      searchValue: '',
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
    },
    activeThemeColor () {
      return this.store.state.settings.activeThemeColor
    }
  },
  async mounted () {
    // this.$f7ready((f7) => {
    // })
    this.loadMore()
    this.$nextTick(() => {
      this.$refs.searchBarRef.$el.setAttribute('action', 'javascript:return true')
    })
    this.$refs.searchBarRef.$el.addEventListener('submit', this.submit, false)
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
        this.$$('.page-content').scrollTop(0, 300)
      }, 300)
    },
    searchArticles () {
      return new Promise(async (resolve, reject) => {
        let data = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          searchType: this.searchType,
          searchValue: this.searchValue
        }
        if (this.searchType) {
          data.searchType = this.searchType
        }
        if (this.searchValue) {
          data.searchValue = this.searchValue
        }
        await this.store.dispatch(types.AJAX, {
          url: this.requestInfo.articles.search,
          data: data
        }).then(responseData => {
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

        await this.doSearch()
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
    async searchClear (e) {
      this.scrollToTop()
      this.kw = ''
      this.pageIndex = 1
      this.searchType = ''
      this.searchValue = ''
      await this.doSearch()
      this.isSearching = false
    },
    search (searchbar, query) {
      this.kw = query
      this.isSearching = true
    },
    searchEnable () {
      this.isSearching = true
      this.kw = ''
    },
    async searchDisable (e) {
      this.isSearching = false
      this.kw = ''
    },
    doSearch () {
      return new Promise(async (resolve) => {
        let responseData = await this.searchArticles()
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
        resolve(true)
      })
    },
    async changeKw (data) {
      this.scrollToTop()
      this.pageIndex = 1
      this.searchType = data.searchType
      this.searchValue = data.searchValue
      await this.doSearch()
      // this.$f7.searchbar.disable()
      this.kw = data.text
      this.isSearching = false
    },
    async submit () {
      if (!this.kw.match(/^[#@]/)) {
        this.scrollToTop()
        this.pageIndex = 1
        this.searchType = 'title'
        this.searchValue = this.kw
        await this.doSearch()
        this.isSearching = false
      }
    }
  }
}
</script>
