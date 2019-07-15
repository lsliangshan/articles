<template>
  <div class="article_item"
       :class="classes"
       :style="{overflow: (loading ? 'hidden' : 'visible')}">
    <transition name="article-transition"
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut faster">
      <keep-alive>
        <f7-card no-shadow
                 v-if="!loading"
                 @click="console.log('sfsdf')"
                 ref="cardRef"
                 style="width: 100%; height: 100%; margin: 0; border-radius: 10px; overflow: hidden;">
          <f7-card-content :padding="false">
            <div class="bg-color-white"
                 :class="classes">
              <f7-card-header text-color="black"
                              class="custom_card_header"
                              style="width: 100%;"
                              @click.prevent.self="goToUserProfile">
                <div class="avatar">
                  <img class="avatar_img"
                       :src="detail.zpm_user.headIcon || defaultAvatar"
                       alt="">
                </div>
                <div class="user_info">
                  <div class="user_name">{{detail.zpm_user.nickname || detail.zpm_user.username.replace(/(\d{3})(\d{4})/, '$1****')}}</div>
                  <div class="publish_time">{{detail.postTime | dateFormat}}</div>
                </div>
              </f7-card-header>
              <!-- <div class="custom_card_content">
                <div class="custom_card_content_title">{{detail.title}}</div>
                <div class="custom_card_content_subtitle"
                     v-md:40="detail.content"></div>
              </div> -->
              <f7-link :href="'/article/' + detail.uuid.substring(0, detail.uuid.indexOf('-'))"
                       view=".view-main"
                       class="w100p">
                <!-- <f7-link :href="false"
                       @click="goToArticle(detail.uuid.substring(0, detail.uuid.indexOf('-')))"> -->
                <div class="custom_card_content">
                  <div class="custom_card_content_title">{{detail.title}}</div>
                  <div class="custom_card_content_subtitle"
                       v-md:40="detail.content"></div>
                </div>
              </f7-link>
              <f7-link :href="'/article/' + detail.uuid.substring(0, detail.uuid.indexOf('-'))"
                       view=".view-main"
                       class="w100p">
                <f7-card-footer class="no-border custom_card_footer">
                  <div class="tag_container">
                    <f7-chip v-for="(tag, index) in detail.tag.split(';')"
                             :key="index"
                             :text="tag | findTextByValue(allArticleTags)"
                             :color="activeThemeColor"
                             outline
                             style="height: 26px; margin-right: 4px;"></f7-chip>
                  </div>
                  <f7-link style="font-size: 13px;"
                           color="gray">查看全文</f7-link>
                </f7-card-footer>
              </f7-link>

            </div>
          </f7-card-content>
        </f7-card>
      </keep-alive>
    </transition>

    <transition name="skeleton-transition"
                enter-active-class="animated fadeIn faster"
                leave-active-class="animated fadeOut">
      <f7-skeleton-block v-if="loading"
                         style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; box-sizing: border-box; border-radius: 10px; overflow: hidden;">
      </f7-skeleton-block>
    </transition>
  </div>
</template>
<style scoped>
.w100p {
  width: 100%;
}
.article_item {
  position: relative;
  width: calc(100% - 40px);
  height: 213px;
  margin: 10px 20px;
  padding: 0;
  box-sizing: border-box;
  border-radius: 15px;
}
.article_item.is-closed .card-content {
  width: 100% !important;
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
.custom_card_header {
  pointer-events: auto;
  padding-top: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e8e8e8 !important;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.custom_card_header::after {
  background-color: transparent !important;
}
.custom_card_footer {
  border-top: 1px solid #eeeeee;
}
.custom_card_footer::before {
  background-color: transparent !important;
}
.display-block {
  position: absolute;
  text-shadow: 0 0 5px black;
  color: white !important;
}
.avatar {
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.avatar_img {
  width: 40px;
  height: 40px;
}
.user_info {
  width: calc(100% - 50px);
  display: flex;
  flex-direction: column;
}
.user_name {
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #333;
}
.publish_time {
  font-size: 12px;
  color: #8e8e93;
}
.custom_card_content {
  width: 100%;
  height: 100px;
  padding: 0 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.custom_card_content_title {
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 16px;
  line-height: 48px;
  font-weight: bold;
  color: #282828;
}
.custom_card_content_subtitle {
  width: 100%;
  font-size: 14px;
  color: #8e8e93;
  word-break: break-all;
}
.custom_card_footer {
  width: 100%;
  padding: 4px 15px !important;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
}
.tag_container {
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 28px;
  flex: 1;
}
.card-opened-fade-in {
  text-shadow: 0 0 5px black;
  color: white;
}
.skeleton-block {
  border-radius: 10px !important;
}
</style>
<script>
import { f7SkeletonBlock, f7SkeletonText, f7Card, f7CardContent, f7CardHeader, f7Link, f7Chip } from 'framework7-vue'
export default {
  name: 'ArticleItem',
  components: {
    f7SkeletonBlock, f7SkeletonText, f7Card, f7CardContent, f7CardHeader, f7Link, f7Chip
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
      defaultOpened: false,
      tags: []
    }
  },
  computed: {
    store () {
      return this.$store
    },
    classes () {
      return [
        {
          [`skeleton-block skeleton-text`]: this.loading,
          ['is-closed']: !this.opened
        }
      ]
    },
    defaultAvatar () {
      return this.detail.zpm_user ? (Number(this.detail.zpm_user.gender) === 1 ? '/static/img/avatar_male_2.jpg' : '/static/img/avatar_female_2.jpg') : '/static/img/avatar_male_2.jpg'
    },
    allArticleTags () {
      return this.store.state.allArticleTags
    },
    activeThemeColor () {
      return this.store.state.settings.activeThemeColor
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
    },
    goToUserProfile (e) {
      e.preventDefault()
      e.stopProperty()
    },
    goToArticle (uuid) {
      this.$f7router.navigate('/article/' + uuid)
    }
  },
  watch: {
    'opened': {
      immediate: true,
      handler (val) {
        if (val) {
          document.title = this.detail.title || '文章详情'
          this.$f7router.updateCurrentUrl('/article/' + this.detail.uuid.replace(/^([a-zA-Z0-9]*)\-.*/, '$1'))
        } else {
          document.title = '文章列表'
          this.$f7router.updateCurrentUrl('/')
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
