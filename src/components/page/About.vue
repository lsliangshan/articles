<template>
  <f7-page>
    <f7-navbar title="Awesome App"></f7-navbar>
    <f7-toolbar bottom>
      <p>About</p>
    </f7-toolbar>
    <p>Page content goes here</p>
    <f7-link href="/about/">About App</f7-link>
  </f7-page>
</template>
<style scoped>
.about_container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
<script>
import { f7Page, f7Navbar, f7Toolbar, f7Link } from 'framework7-vue'
export default {
  name: 'PageAbout',
  components: {
    f7Page, f7Navbar, f7Toolbar, f7Link
  }
}
</script>
