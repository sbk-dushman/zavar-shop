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
      <transition name="fade">
      <div v-if="productsLoading ||productsLoadingFailed" class="loader-container">
        <svg v-if="productsLoading" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="80px" height="80px" viewBox="0 0 128 128" xml:space="preserve"><g><linearGradient id="linear-gradient"><stop offset="0%" stop-color="#8be000"/><stop offset="100%" stop-color="#beee71"/></linearGradient><linearGradient id="linear-gradient2"><stop offset="0%" stop-color="#8be000"/><stop offset="100%" stop-color="#e9f9cf"/></linearGradient><path d="M64 .98A63.02 63.02 0 1 1 .98 64 63.02 63.02 0 0 1 64 .98zm0 15.76A47.26 47.26 0 1 1 16.74 64 47.26 47.26 0 0 1 64 16.74z" fill-rule="evenodd" fill="url(#linear-gradient)"/><path d="M64.12 125.54A61.54 61.54 0 1 1 125.66 64a61.54 61.54 0 0 1-61.54 61.54zm0-121.1A59.57 59.57 0 1 0 123.7 64 59.57 59.57 0 0 0 64.1 4.43zM64 115.56a51.7 51.7 0 1 1 51.7-51.7 51.7 51.7 0 0 1-51.7 51.7zM64 14.4a49.48 49.48 0 1 0 49.48 49.48A49.48 49.48 0 0 0 64 14.4z" fill-rule="evenodd" fill="url(#linear-gradient2)"/><animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="1400ms" repeatCount="indefinite"></animateTransform></g></svg>
      </div>
    </transition>
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
      productsLoading: false,
      productsLoadingFailed: false,
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
      this.productsLoading = true;
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
                          }
                        })
                .then((response) =>  this.productsData = response.data)
                .catch(() => this.productsLoadingFailed = true)
                .then(() => this.productsLoading = false)
              },0);

          }
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
<style>
.catalog{
  position: relative;
}
.loader-container{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.662);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
