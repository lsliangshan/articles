<template>
  <f7-page infinite
           :infinite-distance="50"
           :infinite-preloader="showPreloader"
           @infinite="loadMore">
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

    <!-- <f7-block>
      <article-item v-for="(item, index) in items"
                    :key="index"
                    :index="index">
      </article-item>
    </f7-block> -->
    <f7-list>
      <f7-list-item v-for="(item, index) in items"
                    :title="`Item ${item}`"
                    :key="index"></f7-list-item>
    </f7-list>
  </f7-page>

</template>
<style scoped>
</style>
<script>
  import { f7Statusbar, f7View, f7Page, f7PageContent, f7Navbar, f7NavRight, f7Toolbar, f7Tabs, f7Tab, f7Link, f7Block, f7List, f7ListItem } from 'framework7-vue'
  import ArticleList from '../parts/article/List.vue'
  import ArticleItem from '../parts/article/Item.vue'
  export default {
    name: 'PageHome',
    components: {
      ArticleList,
      ArticleItem,
      f7Statusbar, f7View, f7Page, f7PageContent, f7Navbar, f7NavRight, f7Toolbar, f7Tabs, f7Tab, f7Link, f7Block, f7List, f7ListItem
    },
    data () {
      return {
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        allowInfinite: true,
        showPreloader: true
      }
    },
    mounted () {
      this.$f7ready((f7) => {
        console.log('f7: ', f7)
        console.log('$f7: ', this.$f7)
      })
    },
    methods: {
      loadMore () {
        console.log('1')
        if (!this.allowInfinite) return
        this.allowInfinite = false

        setTimeout(() => {
          if (this.items.length > 200) {
            this.showPreloader = false
            return
          }
          let itemsLength = this.items.length
          for (let i = 1; i <= 20; i++) {
            this.items.push(itemsLength + i)
          }
          this.allowInfinite = true
        }, 1000)
      }
    }
  }
</script>
