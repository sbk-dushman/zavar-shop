<template>
      <router-link :to="{name: 'cart'}" class="header__cart" aria-label="Корзина с товарами">
        <svg width="30" height="21" fill="currentColor">
          <use xlink:href="#icon-cart"></use>
        </svg>
        <span class="header__count" v-if="!$store.state.cartLoaded">
          <svg style="vertical-align: middle"
            xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="16px" height="4px" viewBox="0 0 128 32" xml:space="preserve"><circle fill="#222222" cx="0" cy="0" r="11" transform="translate(16 16)"><animateTransform attributeName="transform" type="scale" additive="sum" values="1;1.42;1;1;1;1;1;1;1;1" dur="1350ms" repeatCount="indefinite"></animateTransform></circle><circle fill="#222222" cx="0" cy="0" r="11" transform="translate(64 16)"><animateTransform attributeName="transform" type="scale" additive="sum" values="1;1;1;1;1.42;1;1;1;1;1" dur="1350ms" repeatCount="indefinite"></animateTransform></circle><circle fill="#222222" cx="0" cy="0" r="11" transform="translate(112 16)"><animateTransform attributeName="transform" type="scale" additive="sum" values="1;1;1;1;1;1;1;1.42;1;1" dur="1350ms" repeatCount="indefinite"></animateTransform></circle>
          </svg>
        </span>

        <span  v-else-if="$store.state.cartLoaded" class="header__count" aria-label="Количество товаров">{{$store.state.cartProducts.length}}</span>

      </router-link>
</template>
<script>
export default {
};
</script>
<style>
</style>
