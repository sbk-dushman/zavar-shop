<template>
           <li class="cart__item product">
              <div class="product__pic">
                <img src="img/phone-square-3.jpg" width="120" height="120" srcset="img/phone-square-3@2x.jpg 2x" alt="Название товара">
              </div>
              <h3 class="product__title">
               {{ product.title}}
              </h3>
              <p class="product__info">
                Объем: <span>128GB</span>
              </p>
              <span class="product__code">
                Артикул: 1501230
              </span>
              <ProductCounter/>
              <div class="product__counter form__counter">
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
              </div>

              <b class="product__price">
                18 990 ₽
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
  methods: {
  },

};

</script>
<style>

</style>
