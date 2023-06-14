<template>
  <component :is="getPageComponent" :page-props="curentPageProps" @gotoPage="(pageName,pageProps) => gotoPage(pageName,pageProps)"/>
</template>

<script>
import MainPage from './components/Pages/MainPage.vue';
import ProductPage from './components/Pages/ProductPage.vue';
import NotFoundPage from './components/Pages/NotFoundPage.vue';

const routes = {
  main: 'MainPage',
  product: 'ProductPage',
};
export default {
  name: 'App',
  data() {
    return {
      curentPage: 'main',
      curentPageProps: {},
    };
  },
  methods: {
    gotoPage(pageName, pageProps) {
      this.curentPage = pageName;
      this.curentPageProps = pageProps || {};
    },
  },
  computed: {
    getPageComponent() {
      return routes[this.curentPage] || 'NotFoundPage';
    },
  },
  components: { MainPage, ProductPage, NotFoundPage },
};
</script>

<style>
/* #app{

} */
</style>
