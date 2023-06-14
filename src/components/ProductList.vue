<template>
             <ul class="catalog__list">
              <ProductItem v-for="product in products" :key="product.id" :product="product"
               @gotoPage="(pageName,pageProps) => $emit('gotoPage',pageName,pageProps)"/>
        </ul>

</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  props: ['products'],
  components: { ProductItem },
};
</script>
<style>

</style>
