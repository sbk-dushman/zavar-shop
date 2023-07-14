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
        <BaseLoader :is-loading="productsLoading" :is-loading-failed="productsLoadingFailed" @re-load="loadProducts()"/>
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
import BaseLoader from '@/components/BaseLoader.vue';
import { API_BASE_PATH } from '../config';

export default {
  name: 'MainPage',
  data() {
    return {
      page: 1,
      productsPerPage: 6,
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
    this.$on('reLoad', () => { console.log('mox2'); });
  },
  methods: {
    loadProducts() {
      this.productsLoadingFailed = false,
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
  components: { ProductList, BasePagination, ProductFilter, BaseLoader },
};
</script>
<style>
.catalog{
  position: relative;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

</style>
