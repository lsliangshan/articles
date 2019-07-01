<template>
  <f7-page>
    <f7-navbar title="INIG"
               :large="true"
               title-large="INIG - 智愚">
      <f7-nav-right>
        <f7-link icon-only
                 :icon-size="24"
                 icon-ios="f7:person_round"
                 icon-aurora="f7:person_round"
                 icon-md="f7:person_round"></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-block style="height: 3000px;">
      <f7-link href="/about/"
               style="margin-top: 80px">About App</f7-link>
      <p>Page content goes here</p>
    </f7-block>
  </f7-page>

</template>
<style scoped>
.home_container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
<script>
import { f7Statusbar, f7View, f7Page, f7Navbar, f7NavRight, f7Toolbar, f7Tabs, f7Tab, f7Link, f7Block } from 'framework7-vue'
export default {
  name: 'PageHome',
  components: {
    f7Statusbar, f7View, f7Page, f7Navbar, f7NavRight, f7Toolbar, f7Tabs, f7Tab, f7Link, f7Block
  },
  data () {
    return {
      activeTab: 'tab-2'
    }
  }
}
</script>
