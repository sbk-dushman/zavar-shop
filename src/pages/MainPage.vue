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
    <ProductFilter :price-to.sync="filterPriceTo"
                   :price-from.sync ="filterPriceFrom"
                   :category-id.sync="filterCategoryId"
                   :color.sync="filterColor"/>


    <section class="catalog">
      <ProductList :products="getProducts"/>
      <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"  />

    </section>

  </div>
</main>
</template>
<script>
import axios from 'axios';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import { API_BASE_PATH } from '../config';

export default {
  name: 'MainPage',
  data() {
    return {
      page: 1,
      productsPerPage: 3,
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: 0,
      productsData: null,
    };
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColor() {
      this.loadProducts();
    },

  },
  created() {
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      clearTimeout(this.loadProductsTimer);
                  this.loadProductsTimer = setTimeout(() => {
                  return axios.get(API_BASE_PATH + '/api/products', {
                          params: {
                          page: this.page,
                          limit: this.productsPerPage,
                          categoryId: this.filterCategoryId,
                          minPrice: this.filterPriceFrom,
                          maxPrice: this.filterPriceTo,
                          colorId: this.filterColor,
                          },
          })
          .then((response) =>  this.productsData = response.data);
                }, 0);
    },
  },
  computed: {
    getProducts() {
      return this.productsData ? this.productsData.items.map(product=> {
        return {
          ... product,
          img: product.image.file.url
        }
      }) : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  components: { ProductList, BasePagination, ProductFilter },
};
</script>
