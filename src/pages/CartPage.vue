<template>
    <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{products.length}} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <BaseLoader :is-loading="true" v-if="!cartLoaded"/>
            <li class="cart__block" v-else-if="products.length=== 0" >Корзина пуста..</li>
            <CartItem   v-for="item in products" :key="item.id"
            :product="item" />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{TotalPrice | numberFormat}} ₽</span>
          </p>

          <router-link  tag="button" :to="{name:'orderConfirm'}" class="cart__button button button--primery" type="submit">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import CartItem from '@/components/CartItem.vue';
import BaseLoader from '@/components/BaseLoader.vue';
import { mapGetters } from 'vuex';

export default {
  filters: {
    numberFormat,
  },
  components: { CartItem, BaseLoader },
  computed: {
    ...mapGetters({ products: 'cartProductsDitail', TotalPrice: 'cartTotalPrice', cartLoaded: 'cartLoaded' }),
  },
  methods: {
  },

};
</script>
<style>
.cart{
  position: relative;
}
</style>
