<template>
  <transition name="search-transition"
              enter-active-class="animated fadeIn faster"
              leave-active-class="animated fadeOut faster">
    <f7-page v-if="kw"
             class="search_list">
      <f7-list class="searchbar-not-found">
        <f7-list-item title="Nothing found"></f7-list-item>
      </f7-list>
      <f7-list class="search-list searchbar-found">
        <f7-list-item title="Acura"></f7-list-item>
        <f7-list-item title="Audi"></f7-list-item>
        <f7-list-item title="BMW"></f7-list-item>
        <f7-list-item title="Cadillac "></f7-list-item>
        <f7-list-item title="Chevrolet "></f7-list-item>
        <f7-list-item title="Chrysler "></f7-list-item>
        <f7-list-item title="Dodge "></f7-list-item>
        <f7-list-item title="Ferrari "></f7-list-item>
        <f7-list-item title="Ford "></f7-list-item>
        <f7-list-item title="GMC "></f7-list-item>
        <f7-list-item title="Honda"></f7-list-item>
        <f7-list-item title="Hummer"></f7-list-item>
        <f7-list-item title="Hyundai"></f7-list-item>
        <f7-list-item title="Infiniti "></f7-list-item>
        <f7-list-item title="Isuzu "></f7-list-item>
        <f7-list-item title="Jaguar "></f7-list-item>
        <f7-list-item title="Jeep "></f7-list-item>
        <f7-list-item title="Kia"></f7-list-item>
        <f7-list-item title="Lamborghini "></f7-list-item>
        <f7-list-item title="Land Rover"></f7-list-item>
        <f7-list-item title="Lexus "></f7-list-item>
        <f7-list-item title="Lincoln "></f7-list-item>
        <f7-list-item title="Lotus "></f7-list-item>
        <f7-list-item title="Mazda"></f7-list-item>
        <f7-list-item title="Mercedes-Benz"></f7-list-item>
        <f7-list-item title="Mercury "></f7-list-item>
        <f7-list-item title="Mitsubishi"></f7-list-item>
        <f7-list-item title="Nissan "></f7-list-item>
        <f7-list-item title="Oldsmobile "></f7-list-item>
        <f7-list-item title="Peugeot "></f7-list-item>
        <f7-list-item title="Pontiac "></f7-list-item>
        <f7-list-item title="Porsche"></f7-list-item>
        <f7-list-item title="Regal"></f7-list-item>
        <f7-list-item title="Saab "></f7-list-item>
        <f7-list-item title="Saturn "></f7-list-item>
        <f7-list-item title="Subaru "></f7-list-item>
        <f7-list-item title="Suzuki "></f7-list-item>
        <f7-list-item title="Toyota"></f7-list-item>
        <f7-list-item title="Volkswagen"></f7-list-item>
        <f7-list-item title="Volvo"></f7-list-item>
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
  import { f7Page, f7List, f7ListItem } from 'framework7-vue'
  export default {
    name: 'SearchList',
    components: {
      f7Page, f7List, f7ListItem
    },
    props: {
      kw: {
        type: String,
        default: ''
      }
    }
  }
</script>
