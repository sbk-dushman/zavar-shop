<template>
<svg v-if="colorsData===null" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="88px" height="22px" viewBox="0 0 128 32" xml:space="preserve"><circle fill="#9eff00" cx="0" cy="0" r="11" transform="translate(16 16)"><animateTransform attributeName="transform" type="scale" additive="sum" values="1;1.42;1;1;1;1;1;1;1;1" dur="1350ms" repeatCount="indefinite"></animateTransform></circle><circle fill="#9eff00" cx="0" cy="0" r="11" transform="translate(64 16)"><animateTransform attributeName="transform" type="scale" additive="sum" values="1;1;1;1;1.42;1;1;1;1;1" dur="1350ms" repeatCount="indefinite"></animateTransform></circle><circle fill="#9eff00" cx="0" cy="0" r="11" transform="translate(112 16)"><animateTransform attributeName="transform" type="scale" additive="sum" values="1;1;1;1;1;1;1;1.42;1;1" dur="1350ms" repeatCount="indefinite"></animateTransform></circle></svg>
<ul v-else class="colors">

<li v-if="colorsData !=null & availableColors==null" class="colors__item" v-for="(color,index) in colorsData" :key="color.id" >
  <label class="colors__label">
    <input class="colors__radio sr-only" v-model="currentColor" type="radio" :name="color.id" :value="color.id">
  <span class="colors__value" :style="`background-color:${color.code}`">
    </span>
  </label>
</li>
<li v-else-if="colorsData !=null & availableColors!=null" class="colors__item" v-for="(color,index) in getAvailableColors" :key="color.id" >
  <label class="colors__label">
    <input class="colors__radio sr-only" v-model="currentColor" type="radio" :name="color.id" :value="color.id">
  <span class="colors__value" :style="`background-color:${color.code}`">
    </span>
  </label>
</li>
</ul>

</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ColorPicker',
  props: {
    color: {},
    availableColors: {
      default: null,
    },
  },
  model: {
    prop: 'color',
    event: 'color-change',
  },
  data() {
    return {
      colorLoading: false,
      colorLoadingFailed: false,
    };
  },
  computed: {
    ...mapGetters({ colorsData: 'getColorsData'}),
    currentColor: {
      get() {
        return this.color;
      },
      set(value) {
        console.log(value);
        this.$emit('color-change', value);
      },
    },
    getAvailableColors(){
       this.availableColors.map((color) => {
        return this.colorsData.filter((item) => item.id !== 2)
      });
      },
  },
  methods: {

  },
};
</script>
<style>

</style>
