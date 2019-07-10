<template>
  <f7-page>
    <f7-list>
      <f7-list-item link="/login"
                    title="Accordion"
                    panel-close></f7-list-item>
    </f7-list>
    <!-- <f7-link icon-only
             :icon-size="48"
             icon-color="gray"
             icon-ios="f7:person_round"
             icon-aurora="f7:person_round"
             icon-md="f7:person_round"
             panel-close="left"
             href="/login"></f7-link> -->
    <!-- <f7-block> -->
    <!-- <div class="header_container">
        <div class="header_avatar">
          <img class="header_avatar_img"
               src=""
               alt=""
               v-if="loginInfo.phonenum">
          <f7-link icon-only
                   :icon-size="48"
                   icon-color="gray"
                   icon-ios="f7:person_round"
                   icon-aurora="f7:person_round"
                   icon-md="f7:person_round"
                   panel-close="left"
                   href="/login"
                   view=".view-main"
                   v-else></f7-link>
        </div>
        <div class="header_info"></div>
      </div> -->
    <!-- </f7-block> -->
  </f7-page>
</template>
<style scoped>
  .header_container {
    width: 100%;
    height: 64px;
    margin-top: 48px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .header_avatar {
    width: 64px;
    height: 64px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 1;
    border-radius: 50%;
    overflow: hidden;
  }
  .header_avatar_img {
    min-width: 64px;
    min-height: 64px;
  }
  .header_info {
    width: calc(100% - 64px);
    height: 64px;
    display: flex;
    flex-direction: column;
    padding-left: 15px;
    box-sizing: border-box;
  }
</style>
<script>
  import { f7Page, f7Block, f7Link, f7List, f7ListItem } from 'framework7-vue'
  export default {
    name: 'Profile',
    components: {
      f7Page, f7Block, f7Link, f7List, f7ListItem
    },
    props: {},
    computed: {
      store () {
        return this.$store
      },
      loginInfo () {
        return this.store.state.loginInfo
      }
    },
    methods: {
      goToLogin () {
        // this.$f7.panel.close()
        let router = this.$f7.views.main.router
        setTimeout(() => {
          router.navigate('/login')
        }, 300)
      }
    }
  }
</script>
