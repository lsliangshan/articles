<template>
  <div class="article_item"
       :class="classes"
       :style="{overflow: (loading ? 'hidden' : 'visible')}">
    <transition name="article-transition"
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut faster">
      <f7-card expandable
               v-if="!loading"
               :padding="false"
               :expandable-opened="isOpen"
               @card:open="openDetail"
               @card:close="closeDetail"
               style="width: 100%; height: 100%; margin: 0;">
        <f7-card-content :padding="false">
          <div class="bg-color-white"
               :class="classes"
               :style="{height: imageHeight + 'px'}">
            <img class="top_img"
                 style="position: absolute"
                 :src="detail.album || topImage"
                 v-if="opened">
            <f7-card-header text-color="black"
                            class="display-block"
                            :style="{paddingTop: opened ? '58px' : '20px'}">
              <span class="card_title"
                    :style="{width: opened ? '100%' : 'calc(100% - 40px)'}">{{detail.title}}</span>
              <small :style="{opacity: 0.7}">{{detail.zpm_user ? (detail.zpm_user.nickname || detail.zpm_user.username) : '无名'}}</small>
            </f7-card-header>
            <f7-link card-close
                     color="black"
                     class="card-opened-fade-in"
                     :style="{position: 'absolute', right: '15px', top: '15px'}"
                     icon-f7="close_round_fill"></f7-link>
          </div>
          <div class="card-content-padding oxh"
               v-md="detail.content"
               v-if="opened">

          </div>
        </f7-card-content>
      </f7-card>
    </transition>

    <f7-skeleton-block v-if="loading"
                       style="width: 100%; height: 100%;"></f7-skeleton-block>
  </div>
</template>
<style scoped>
.article_item {
  width: calc(100% - 40px);
  height: 148px;
  margin: 20px 20px;
  padding: 0;
  box-sizing: border-box;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
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
</style>
<script>
import { f7SkeletonBlock, f7Card, f7CardContent, f7CardHeader, f7Link } from 'framework7-vue'
export default {
  name: 'ArticleItem',
  components: {
    f7SkeletonBlock, f7Card, f7CardContent, f7CardHeader, f7Link
  },
  props: {
    index: {
      type: Number
    },
    detail: {
      type: Object,
      default () {
        return {}
      }
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      effect: 'blink',
      loading: true,
      topImage: 'https://cdn.dribbble.com/users/859460/screenshots/2838679/14.png',
      // topImage: 'https://static.dei2.com/live/images/article.jpeg',
      opened: false,
      imageHeight: 250,
      defaultOpened: false
    }
  },
  computed: {
    classes () {
      return [
        {
          [`skeleton-block skeleton-text`]: this.loading
        }
      ]
    }
  },
  mounted () {
    // this.$nextTick(() => {
    //   setTimeout(() => {
    //     this.defaultOpened = this.isOpen
    //   }, 300)
    // })
  },
  methods: {
    openDetail (e) {
      this.opened = true
    },
    closeDetail (e) {
      this.opened = false
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
    'opened': {
      immediate: true,
      handler (val) {
        if (val) {
          document.title = this.detail.title || '文章详情'
        } else {
          document.title = '文章列表'
        }
      }
    },
    'detail.content': {
      immediate: true,
      handler (val) {
        setTimeout(() => {
          this.loading = false
        }, 800)
      }
    }
  }
}
</script>
