<template>
  <f7-page>
    <!-- <article-item :index="-1"
                  :detail="detail"
                  :is-open="true"></article-item> -->
    <f7-card expandable
             :padding="false"
             :expandable-opened="true"
             @card:close="closeDetail"
             style="width: 100%; height: 100%; margin: 0;">
      <f7-card-content :padding="false">
        <div class="bg-color-white"
             :class="classes"
             style="position: relative; min-height: 200px; display: flex; flex-direction: row; align-items: flex-end;">
          <img class="top_img"
               style="position: absolute"
               :src="detail.album || topImage">
          <f7-card-header text-color="black"
                          class="display-block"
                          :style="{paddingTop: '58px'}">
            <span class="card_title"
                  :style="{width: '100%'}">{{detail.title}}</span>
            <small :style="{opacity: 0.7}">{{detail.zpm_user ? (detail.zpm_user.nickname || detail.zpm_user.username) : '无名'}}</small>
          </f7-card-header>
          <f7-link card-close
                   color="gray"
                   class="card-opened-fade-in"
                   :style="{position: 'absolute', right: '15px', top: '15px'}"
                   icon-f7="close_round_fill"></f7-link>
        </div>
        <div class="card-content-padding oxh"
             v-md="detail.content">

        </div>
      </f7-card-content>
    </f7-card>
  </f7-page>
</template>
<style scoped>
.top_img {
  width: 100%;
}
.card_title {
  display: -webkit-box;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.oxh {
  overflow-x: hidden;
}
.display-block {
  position: absolute;
  text-shadow: 0 0 5px white;
}
</style>

<script>
import { f7Page, f7Card, f7CardContent, f7CardHeader, f7Link } from 'framework7-vue'
import ArticleItem from '../../parts/article/Item.vue'
import * as types from '../../../store/mutation-types'
export default {
  name: 'ArticleDetail',
  components: {
    f7Page, f7Card, f7CardContent, f7CardHeader, f7Link,
    ArticleItem
  },
  props: {},
  data () {
    return {
      detail: null,
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
