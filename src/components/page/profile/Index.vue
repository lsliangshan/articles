<template>
  <f7-page>
    <!-- <f7-link icon-only
             :icon-size="48"
             icon-color="gray"
             icon-ios="f7:person_round"
             icon-aurora="f7:person_round"
             icon-md="f7:person_round"
             panel-close="left"
             href="/login"></f7-link> -->
    <!-- <f7-block> -->
    <div class="profile_container">
      <div class="header_container"
           :class="'bg-color-' + activeThemeColor">
        <div class="header_avatar">
          <img class="header_avatar_img"
               :src="Number(loginInfo.gender) === 1 ? '/static/img/avatar_male_2.jpg' : '/static/img/avatar_female_2.jpg'"
               v-if="loginInfo.phonenum">
          <transition name="avatar-transition"
                      enter-active-class="animated fadeIn faster"
                      leave-active-class="animated fadeOut">
            <img class="header_avatar_img"
                 :src="loginInfo.headIcon"
                 v-if="loginInfo.phonenum && avatarLoaded">
          </transition>
          <f7-link icon-only
                   :icon-size="48"
                   icon-color="white"
                   icon-ios="f7:person_round"
                   icon-aurora="f7:person_round"
                   icon-md="f7:person_round"
                   panel-close="left"
                   href="/login"
                   view=".view-main"
                   v-if="!loginInfo.phonenum"></f7-link>
        </div>
        <div class="header_info">
          <div class="header_nickname"
               v-if="loginInfo.phonenum">{{loginInfo.nickname || loginInfo.phonenum.replace(/(\d{3})(\d{4})/, '$1****')}}</div>
          <div class="header_nickname"
               v-else>游客</div>
          <div class="header_desc">这家伙嘴很硬，什么都不肯说</div>
        </div>
      </div>
      <div class="profile_content">
        <transition name="list-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
          <f7-list class="custom_list"
                   v-if="loginInfo.phonenum">
            <f7-list-item link="#"
                          title="我的文章">
              <f7-icon slot="media"
                       f7="favorites_fill"
                       color="blue"></f7-icon>
            </f7-list-item>
            <f7-list-item link="#"
                          title="我的收藏">
              <f7-icon slot="media"
                       f7="favorites_alt_fill"
                       color="red"></f7-icon>
            </f7-list-item>
          </f7-list>
        </transition>
        <f7-list class="custom_list">
          <f7-list-item link="#"
                        title="设置">
            <f7-icon slot="media"
                     f7="settings_fill"></f7-icon>
          </f7-list-item>
        </f7-list>

        <!-- <f7-block> -->
        <div class="footer_btns">
          <transition name="logout-transition"
                      enter-active-class="animated fadeIn faster"
                      leave-active-class="animated fadeOut faster">
            <f7-button color="red"
                       fill
                       raised
                       text="退出"
                       @click="logout"
                       class="absolute custom_btn"
                       v-if="loginInfo.phonenum"></f7-button>
          </transition>
          <transition name="login-transition"
                      enter-active-class="animated fadeIn faster"
                      leave-active-class="animated fadeOut faster">
            <f7-button fill
                       raised
                       text="登录"
                       v-if="!loginInfo.phonenum"
                       class="absolute custom_btn"
                       panel-close="left"
                       href="/login"
                       view=".view-main"></f7-button>
          </transition>
        </div>

        <!-- </f7-block> -->
      </div>
    </div>
    <!-- </f7-block> -->
  </f7-page>
</template>
<style scoped>
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.profile_container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header_container {
  width: 100%;
  height: 128px;
  padding-top: 100px;
  padding-bottom: 20px;
  /* background-color: lightblue; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}
.header_avatar {
  position: relative;
  width: 64px;
  height: 64px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  border-radius: 50%;
  overflow: hidden;
}
.header_avatar_img {
  position: absolute;
  width: 64px;
  height: 64px;
}
.header_info {
  width: calc(100% - 64px);
  height: 54px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.header_nickname {
  width: 100%;
  height: 42px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #f8f8f8;
}
.header_desc {
  width: 100%;
  height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #eeeeee;
}
.profile_content {
  width: 100%;
  height: calc(100% - 248px);
  /* padding-top: 48px;
  box-sizing: border-box;
  background-color: lightblue; */
}
.custom_list {
  margin: 15px 0;
}
.footer_btns {
  position: relative;
  margin: var(--f7-block-margin-vertical) 0;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: calc(
    var(--f7-block-padding-horizontal) + var(--f7-safe-area-left)
  );
  padding-right: calc(
    var(--f7-block-padding-horizontal) + var(--f7-safe-area-right)
  );
}
.custom_btn {
  width: calc(100% - 2 * var(--f7-block-padding-horizontal));
}
</style>
<script>
import { f7Page, f7Block, f7Link, f7List, f7ListItem, f7Button, f7Icon } from 'framework7-vue'
import * as types from '../../../store/mutation-types'
export default {
  name: 'Profile',
  components: {
    f7Page, f7Block, f7Link, f7List, f7ListItem, f7Button, f7Icon
  },
  props: {},
  data () {
    return {
      avatarLoaded: false
    }
  },
  computed: {
    store () {
      return this.$store
    },
    loginInfo () {
      return this.store.state.loginInfo
    },
    activeThemeColor () {
      return this.store.state.activeThemeColor
    }
  },
  methods: {
    logout () {
      this.store.commit(types.CACHE_LOGIN_INFO, {
        loginInfo: {}
      })
    }
  },
  watch: {
    'loginInfo.headIcon': {
      immediate: true,
      handler (val) {
        console.log('headIcon changed')
        const that = this
        if (val) {
          let image = new Image()
          image.onload = function () {
            that.avatarLoaded = true
          }
          image.src = val
        }
      }
    }
  }
}
</script>
