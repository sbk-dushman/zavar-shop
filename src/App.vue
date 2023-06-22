<template>
  <component :is="getPageComponent" :page-props="curentPageProps"/>
</template>

<script>
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import eventBus from "@/eventBus.js";

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
  created() {
    eventBus.$on('gotoPage', (pageName,pageProps) => this.gotoPage(pageName, pageProps));
  },
};
</script>

<style>
/* #app{

} */
</style>
