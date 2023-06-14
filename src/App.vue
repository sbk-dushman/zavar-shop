<template>
  <MainPage v-if="curentPage ==='main'"/>
  <ProductPage v-else-if= "curentPage ==='product'" />
  <NotFoundPage v-else/>
</template>

<script>
import MainPage from './components/Pages/MainPage.vue';
import ProductPage from './components/Pages/ProductPage.vue';
import NotFoundPage from './components/Pages/NotFoundPage.vue';

export default {
  name: 'App',
  data() {
    return {
      curentPage: 'main',
      routes: {
        main: 'MainPage',
        product: 'ProductPage',
      },
      computed: {
        getPageComponent() {
          return this.routes[this.curentPage] || 'NotFoundPage';
        },
      },
    };
  },
  components: { MainPage, ProductPage, NotFoundPage },
};
</script>

<style>
/* #app{

} */
</style>
