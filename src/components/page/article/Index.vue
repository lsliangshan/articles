<template>
  <f7-page>

    <!-- <article-item :index="-1"
                  :detail="detail"
                  :is-open="true"></article-item> -->
    <f7-navbar>
      <f7-nav-left :color="themeDark ? 'white' : 'black'"
                   back-link="返回"></f7-nav-left>
      <f7-nav-title>{{detail.title}}</f7-nav-title>
    </f7-navbar>
    <div class="card_header"
         :class="classes">
      <img class="top_img"
           :src="detail.album || topImage">
      <div text-color="black"
           class="display-block"
           :style="{paddingTop: '58px'}">
        <span class="card_title"
              :style="{width: '100%'}">{{detail.title}}</span>
        <small class="card_desc"
               :style="{opacity: 0.7}">{{detail.zpm_user ? (detail.zpm_user.nickname || detail.zpm_user.username) : '无名'}}</small>
      </div>
    </div>
    <div class="card-content-padding oxh"
         v-if="detail.content"
         v-md="detail.content">

    </div>
  </f7-page>
</template>
<style scoped>
.top_img {
  width: 100%;
}
.card_header {
  position: relative;
}
.card_title {
  display: -webkit-box;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 24px;
}
.card_desc {
  font-size: 14px;
}
.oxh {
  overflow-x: hidden;
}
.display-block {
  position: absolute;
  width: calc(100% - 30px);
  text-shadow: 0 0 5px black;
  color: white !important;
  bottom: 20px;
  left: 15px;
}
.card-opened-fade-in {
  text-shadow: 0 0 5px black;
  color: white;
}
</style>

<script>
import { f7Page, f7Card, f7CardContent, f7CardHeader, f7Link, f7Navbar, f7NavLeft, f7NavTitle, f7NavRight, f7Block } from 'framework7-vue'
import ArticleItem from '../../parts/article/Item.vue'
import * as types from '../../../store/mutation-types'
export default {
  name: 'ArticleDetail',
  components: {
    f7Page, f7Card, f7CardContent, f7CardHeader, f7Link, f7Navbar, f7NavLeft, f7NavTitle, f7NavRight, f7Block,
    ArticleItem
  },
  props: {},
  data () {
    return {
      detail: {},
      topImage: 'https://static.dei2.com/live/images/article.jpeg',
      opened: false,
      imageHeight: 250
    }
  },
  computed: {
    store () {
      return this.$store
    },
    requestInfo () {
      return this.store.state.requestInfo
    },
    themeDark () {
      return this.store.state.settings.themeDark
    },
    classes () {
      return [
        {
          [`skeleton-block skeleton-text`]: this.loading
        }
      ]
    }
  },
  async mounted () {
    if (this.$f7route.params.articleId) {
      let openedDetail = await this.getArticleDetail({
        articleId: this.$f7route.params.articleId
      })
      this.detail = openedDetail || null
    }
  },
  methods: {
    getArticleDetail (args) {
      return new Promise(async (resolve, reject) => {
        await this.store.dispatch(types.AJAX, {
          url: this.requestInfo.articles.detail,
          data: {
            uuid: args.articleId
          }
        }).then(responseData => {
          if (responseData.status === 200 && responseData.data) {
            resolve(responseData.data)
          } else {
            resolve(null)
          }
        }).catch(err => {
          resolve(null)
        })
      })
    },
    openDetail (e) {
      this.opened = true
    },
    closeDetail (e) {
      this.$f7router.navigate('/')
    }
  },
  watch: {
    'detail.album': {
      immediate: true,
      handler (val) {
        if (val) {
          let image = new Image()
          image.onload = () => {
            this.imageHeight = Math.floor(document.documentElement.offsetWidth * image.height / image.width)
          }
          image.src = val
        } else {
          this.imageHeight = Math.floor(document.documentElement.offsetWidth * 250 / 375)
        }
      }
    },
    'detail.title': {
      immediate: true,
      handler (val) {
        document.title = val || '文章详情'
      }
    }
  }
}
</script>
