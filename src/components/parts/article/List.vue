<template>
  <div class="article_list_container">
    <article-item v-for="item in 100"
                  :key="item"
                  :index="item">
    </article-item>
  </div>
</template>
<style scoped>
  .article_list_container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
<script>
  import { f7Page, f7Block } from 'framework7-vue'
  import ArticleItem from './Item.vue'
  export default {
    name: 'ArticleList',
    components: {
      f7Page,
      f7Block,
      ArticleItem
    },
    data () {
      return {
      }
    }
  }
</script>

