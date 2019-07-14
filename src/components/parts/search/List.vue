<template>
  <transition name="search-transition"
              enter-active-class="animated fadeIn faster"
              leave-active-class="animated fadeOut faster">
    <f7-page v-if="isSearching && kw.match(/^[#@]/)"
             class="search_list">
      <f7-list class="searchbar-not-found">
        <f7-list-item title="Nothing found"></f7-list-item>
      </f7-list>
      <f7-list class="search-list searchbar-found">
        <f7-list-group v-for="(p, index) in computedFormatArticleTags"
                       :key="index"
                       v-if="p.children.length > 0">
          <f7-list-item :title="p.text"
                        group-title
                        style="font-size: 13px;"></f7-list-item>
          <f7-list-item v-for="(c, idx) in p.children"
                        :key="idx"
                        :title="c.text"
                        @click="changeKw(c.text, c.value)"></f7-list-item>
        </f7-list-group>
      </f7-list>
    </f7-page>
  </transition>
</template>
<style scoped>
.search_list {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 101;
}
</style>
<script>
import { f7Page, f7List, f7ListGroup, f7ListItem } from 'framework7-vue'
export default {
  name: 'SearchList',
  components: {
    f7Page, f7List, f7ListGroup, f7ListItem
  },
  props: {
    kw: {
      type: String,
      default: ''
    },
    isSearching: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    store () {
      return this.$store
    },
    formatArticleTags () {
      return this.store.state.formatArticleTags
    },
    computedFormatArticleTags () {
      if (this.kw.indexOf('#') === 0) {
        return JSON.parse(JSON.stringify(this.formatArticleTags)).filter(item => {
          return Object.assign(item, {
            children: item.children.filter(itm => {
              return itm.text.toLowerCase().indexOf(this.kw.substring(1).toLowerCase()) > -1
            })
          })
        })
      } else {
        return []
      }
    },
    searchType () {
      if (this.kw.indexOf('#') === 0) {
        return 'tag'
      } else if (this.kw.indexOf('@') === 0) {
        return 'author'
      } else {
        return 'content'
      }
    }
  },
  methods: {
    changeKw (kw, value) {
      this.$emit('change', {
        text: '#' + kw,
        value: value,
        searchType: 'tag',
        searchValue: value
      })
    }
  }
}
</script>
