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
      <div v-if="productsLoading || productsLoadingFailed" class="loader-container">
        <svg v-if="productsLoading" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="80px" height="80px" viewBox="0 0 128 128" xml:space="preserve"><g><linearGradient id="linear-gradient"><stop offset="0%" stop-color="#8be000"/><stop offset="100%" stop-color="#beee71"/></linearGradient><linearGradient id="linear-gradient2"><stop offset="0%" stop-color="#8be000"/><stop offset="100%" stop-color="#e9f9cf"/></linearGradient><path d="M64 .98A63.02 63.02 0 1 1 .98 64 63.02 63.02 0 0 1 64 .98zm0 15.76A47.26 47.26 0 1 1 16.74 64 47.26 47.26 0 0 1 64 16.74z" fill-rule="evenodd" fill="url(#linear-gradient)"/><path d="M64.12 125.54A61.54 61.54 0 1 1 125.66 64a61.54 61.54 0 0 1-61.54 61.54zm0-121.1A59.57 59.57 0 1 0 123.7 64 59.57 59.57 0 0 0 64.1 4.43zM64 115.56a51.7 51.7 0 1 1 51.7-51.7 51.7 51.7 0 0 1-51.7 51.7zM64 14.4a49.48 49.48 0 1 0 49.48 49.48A49.48 49.48 0 0 0 64 14.4z" fill-rule="evenodd" fill="url(#linear-gradient2)"/><animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="1400ms" repeatCount="indefinite"></animateTransform></g></svg>
              <div  v-if="productsLoadingFailed" class="error-content">
                <svg height="80px" width="80px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 507.425 507.425" xml:space="preserve">
                        <path style="fill:#FFC52F;" d="M329.312,129.112l13.6,22l150.8,242.4c22.4,36,6,65.2-36.8,65.2h-406.4c-42.4,0-59.2-29.6-36.8-65.6
                            l198.8-320.8c22.4-36,58.8-36,81.2,0L329.312,129.112z"/>
                        <g>
                          <path style="fill:#F4EFEF;" d="M253.712,343.512c-10.8,0-20-8.8-20-20v-143.2c0-10.8,9.2-20,20-20s20,8.8,20,20v143.2
                            C273.712,334.312,264.512,343.512,253.712,343.512z"/>
                          <path style="fill:#F4EFEF;" d="M253.312,407.112c-5.2,0-10.4-2-14-6c-3.6-3.6-6-8.8-6-14s2-10.4,6-14c3.6-3.6,8.8-6,14-6
                            s10.4,2,14,6c3.6,3.6,6,8.8,6,14s-2,10.4-6,14C263.712,404.712,258.512,407.112,253.312,407.112z"/>
                        </g>
                        <path d="M456.912,465.512h-406.4c-22,0-38.4-7.6-46-21.6s-5.6-32.8,6-51.2l198.8-321.6c11.6-18.8,27.2-29.2,44.4-29.2l0,0
                          c16.8,0,32.4,10,43.6,28.4l35.2,56.4l0,0l13.6,22l150.8,243.6c11.6,18.4,13.6,37.2,6,51.2
                          C495.312,457.912,478.912,465.512,456.912,465.512z M253.312,49.912L253.312,49.912c-14,0-27.2,8.8-37.6,25.2l-198.8,321.6
                          c-10,16-12,31.6-5.6,43.2s20.4,17.6,39.2,17.6h406.4c18.8,0,32.8-6.4,39.2-17.6c6.4-11.2,4.4-27.2-5.6-43.2l-150.8-243.6l-13.6-22
                          l-35.2-56.4C280.512,58.712,267.312,49.912,253.312,49.912z"/>
                        <path d="M249.712,347.512c-13.2,0-24-10.8-24-24v-143.2c0-13.2,10.8-24,24-24s24,10.8,24,24v143.2
                          C273.712,336.712,262.912,347.512,249.712,347.512z M249.712,164.312c-8.8,0-16,7.2-16,16v143.2c0,8.8,7.2,16,16,16s16-7.2,16-16
                          v-143.2C265.712,171.512,258.512,164.312,249.712,164.312z"/>
                        <path d="M249.712,411.112L249.712,411.112c-6.4,0-12.4-2.4-16.8-6.8c-4.4-4.4-6.8-10.8-6.8-16.8c0-6.4,2.4-12.4,6.8-16.8
                          c4.4-4.4,10.8-7.2,16.8-7.2c6.4,0,12.4,2.4,16.8,7.2c4.4,4.4,7.2,10.4,7.2,16.8s-2.4,12.4-7.2,16.8
                          C262.112,408.312,256.112,411.112,249.712,411.112z M249.712,371.112c-4,0-8.4,1.6-11.2,4.8c-2.8,2.8-4.8,7.2-4.8,11.2
                          c0,4.4,1.6,8.4,4.8,11.2c2.8,2.8,7.2,4.8,11.2,4.8s8.4-1.6,11.2-4.8c2.8-2.8,4.8-7.2,4.8-11.2s-1.6-8.4-4.8-11.2
                          C258.112,372.712,253.712,371.112,249.712,371.112z"/>
                </svg>
                <p class="error-content___text">Ошибка загрузки!</p>
                <button @click="loadProducts()" class="button button--primery">
                  Попробовать снова
          </button>
              </div>
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
.error-content{
  width: 50%;
  height: 240px;
  border: 1px solid #9eff00;
  display: flex;
  padding: 10px;
  justify-content: center;
  background-color: #272727;
  flex-direction: column;
    color: #fff;
    align-items: center;
}
.error-content___text{
  font-size: 17px;
  text-transform: uppercase;
}
</style>
