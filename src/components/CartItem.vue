<template>
           <li  class="cart__item product">
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
                <ProductCounter counter-class="product__counter form__counter" v-model="productAmount"/>
              <b class="product__price">
              {{getPriceForAmount | numberFormat}} ₽
              </b>

              <button
                @click="deletePoduct(product.productDitails.id)"
               class="product__del button-del" type="button" aria-label="Удалить товар из корзины">
                <svg width="20" height="20" fill="currentColor">
                  <use xlink:href="#icon-close"></use>
                </svg>
              </button>
            </li>
</template>
<script>
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';
import ProductCounter from './ProductCounter.vue';

export default {
  props: ['product'],
  filters: {
    numberFormat,
  },
  components: { ProductCounter},

  methods: {
    ...mapActions({ deletePoduct: 'deleteProductFromCart' }),
  },
  computed: {
    productAmount: {
      get() {
        return this.product.amount;
      },
      set(value) {
        this.$store.dispatch('updatateCartProductAmount', { productId: this.product.productId, amount: value});
      },

    },
    getPriceForAmount() {
        return this.product.productDitails.price * this.product.amount;
      }
  },

};

</script>
<style>

</style>
