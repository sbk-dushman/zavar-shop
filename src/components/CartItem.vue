<template>
           <li class="cart__item product">
              <div class="product__pic">
                <img :src="product.productDitails.img" alt="Название товара">
              </div>
              <h3 class="product__title">
               {{ product.productDitails.title}}
              </h3>
              <!-- <p class="product__info">
                Объем: <span>128GB</span>
              </p> -->
              <span class="product__code">
                Артикул: {{ product.productDitails.id }}
              </span>
              <div class="product__counter form__counter">
                <ProductCounter v-model="productAmount"/>
              </div>

              <!-- <div class="product__counter form__counter">
                <button type="button" aria-label="Убрать один товар">
                  <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" value="1" name="count">

                <button type="button" aria-label="Добавить один товар">
                  <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div> -->

              <b class="product__price">
              {{product.productDitails.price | numberFormat}} ₽
              </b>

              <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины">
                <svg width="20" height="20" fill="currentColor">
                  <use xlink:href="#icon-close"></use>
                </svg>
              </button>
            </li>
</template>
<script>
import numberFormat from '@/helpers/numberFormat';
import ProductCounter from './ProductCounter.vue';

export default {
  props: ['product'],
  filters: {
    numberFormat,
  },
  components: { ProductCounter },
  computed: {
    productAmount: {
        get() {
            this.product;
        },
        set() {
        },
    },
  },
  methods: {
  },

};

</script>
<style>

</style>
