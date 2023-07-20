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
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText title="ФИО"
                          v-model="formData.name"
                          placeholder="Введите ваше полное имя"
                          :error="formEror.name" />
            <BaseFormText title="Адрес доставки"
                          v-model="formData.address"
                          placeholder="Введите ваш адрес"
                          :error="formEror.address" />

            <BaseFormText title="Телефон"
              v-model="formData.phone"
              placeholder="Введите ваш телефон"
              :error="formEror.phone" />

            <BaseFormText title="Email"
              v-model="formData.email"
              placeholder="Введи ваш Email"
             :error="formEror.email" />

            <BaseFormTextarea title="Комментарий к заказу"
            v-model="formData.comments"
            placeholder="Ваши пожелания"
            :error="formEror.comments" />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in products">
              <h3>{{item.productDitails.title}}</h3>
              x <s> {{item.productDitails.amount}}</s> <b>{{item.productDitails.price | numberFormat}} ₽</b>
              <span>Артикул: {{item.productDitails.id}}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>3</b> товара на сумму <b> {{TotalPrice | numberFormat}} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>
</template>
<script>
import { mapGetters } from 'vuex';
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'OrderConfirm',
  filters: { numberFormat },
  components: { BaseFormTextarea, BaseFormText },
  computed: {
    ...mapGetters({ products: 'cartProductsDitail', TotalPrice: 'cartTotalPrice', cartLoaded: 'cartLoaded' }),
  },
  data() {
    return {
      formData: {},
      formEror: {},
    };
  },
};
</script>
