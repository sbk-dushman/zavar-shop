<template>
  <ul class="colors">
              <li class="colors__item">
                <label class="colors__label">
                  <input class="colors__radio sr-only" v-model="currentColor" type="radio" name="color" :value="'#73B6EA'" checked>
                  <span class="colors__value" style="background-color: #73B6EA;">
                  </span>
                </label>
              </li>
              <li class="colors__item">
                <label class="colors__label">
                  <input class="colors__radio sr-only"v-model="currentColor" type="radio" name="color" :value="'#FFBE15'">
                  <span class="colors__value" style="background-color: #FFBE15;">
                  </span>
                </label>
              </li>
              <li class="colors__item">
                <label class="colors__label">
                  <input class="colors__radio sr-only"v-model="currentColor" type="radio" name="color" :value="'#939393'">
                  <span class="colors__value" style="background-color: #939393;">
                </span></label>
              </li>
              <li class="colors__item">
                <label class="colors__label">
                  <input class="colors__radio sr-only"v-model="currentColor" type="radio" name="color" :value="'#8BE000'">
                  <span class="colors__value" style="background-color: #8BE000;">
                </span></label>
              </li>
              <li class="colors__item">
                <label class="colors__label">
                  <input class="colors__radio sr-only"v-model="currentColor" type="radio" name="color" :value="'#FF6B00'">
                  <span class="colors__value" style="background-color: #FF6B00;">
                </span></label>
              </li>
              <li class="colors__item">
                <label class="colors__label">
                  <input class="colors__radio sr-only" v-model="currentColor" type="radio" name="color" :value="'#FFF'">
                  <span class="colors__value" style="background-color: #FFF;">
                </span></label>
              </li>
              <li class="colors__item">
                <label class="colors__label">
                  <input class="colors__radio sr-only" v-model="currentColor" type="radio" name="color" :value="'#000'">
                  <span class="colors__value" style="background-color: #000;">
                </span></label>
              </li>
            </ul>
</template>
<script>

export default {
  model: {
    prop: 'amount',
    event: 'amount-change',
  },
  props: ['amount', 'counter-class'],
  computed: {

    currentAmaunt: {
      get() {
        return this.amount;
      },
      set(value) {
        this.$emit('amount-change', value);
      },
    },
  },
  methods: {
    loadProducts() {
                  this.loadProductsTimer = setTimeout(() => {
                  return axios.get(API_BASE_PATH + '/api/products');
                  })
            },
  },
};
</script>
<style>

</style>
