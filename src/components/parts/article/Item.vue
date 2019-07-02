<template>
  <div class="article_item"
       :class="classes"
       :style="{backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.1)`}">
    <div class="article_wrapper"
         v-if="!loading">
      item: {{index}}
    </div>
    <f7-skeleton-block v-else
                       style="width: 100%; height: 100%;"></f7-skeleton-block>
  </div>
</template>
<style scoped>
  .article_item {
    width: 100%;
    height: 48px;
    margin: 10px 0;
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
</style>
<script>
  import { f7SkeletonBlock } from 'framework7-vue'
  export default {
    name: 'ArticleItem',
    components: {
      f7SkeletonBlock
    },
    props: {
      index: {
        type: Number
      }
    },
    data () {
      return {
        effect: 'fade',
        loading: true
      }
    },
    computed: {
      classes () {
        return [
          {
            [`skeleton-block skeleton-text skeleton-effect-${this.effect}`]: this.loading
          }
        ]
      }
    },
    mounted () {
      this.$nextTick(() => {
        setTimeout(() => {
          this.loading = false
        }, 100)
      })
    }
  }
</script>
