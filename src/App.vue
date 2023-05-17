<template>
    <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter/>
      <section class="catalog">
        <ProductList :products="getProducts" />
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"  />

      </section>

    </div>
  </main>

</template>

<script>
import products from './data/products';
import ProductList from './components/ProductList.vue';
import BasePagination from './components/BasePagination.vue';
import ProductFilter from './components/ProductFilter.vue';

export default {
  name: 'App',
  data() {
    return {
      page: 1,
      productsPerPage: 3,
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;
      if (this.filterPriceFrom > 0) {
        filteredProducts.filter((product) => product.price > this.filterPriceFrom);
      }
      if (this.filterPriceTo > 0) {
        filteredProducts.filter((product) => product.price < this.filterPriceTo);
      }
      if (this.filterCategoryId > 0) {
        filteredProducts.filter((product) => product.filterCategoryId === this.filterCategoryId);
      }

      return filteredProducts;
    },
    getProducts() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },
  components: { ProductList, BasePagination, ProductFilter },
};
</script>

<style>
/* #app{

} */
</style>
