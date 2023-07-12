<template>

 <ul class="colors">

    <li v-if="colorLoading">
        <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="88px" height="22px" viewBox="0 0 128 32" xml:space="preserve"><circle fill="#9eff00" cx="0" cy="0" r="11" transform="translate(16 16)"><animateTransform attributeName="transform" type="scale" additive="sum" values="1;1.42;1;1;1;1;1;1;1;1" dur="1350ms" repeatCount="indefinite"></animateTransform></circle><circle fill="#9eff00" cx="0" cy="0" r="11" transform="translate(64 16)"><animateTransform attributeName="transform" type="scale" additive="sum" values="1;1;1;1;1.42;1;1;1;1;1" dur="1350ms" repeatCount="indefinite"></animateTransform></circle><circle fill="#9eff00" cx="0" cy="0" r="11" transform="translate(112 16)"><animateTransform attributeName="transform" type="scale" additive="sum" values="1;1;1;1;1;1;1;1.42;1;1" dur="1350ms" repeatCount="indefinite"></animateTransform></circle></svg>
      </li>
      <li v-else-if="ColorsData !=null" class="colors__item" v-for="(color,index) in getColors" :key="color.id" >
        <label class="colors__label">
          <input class="colors__radio sr-only" v-model="currentColor" type="radio" :name="color.id" :value="color.id">
        <span class="colors__value" :style="`background-color:${color.code}`">
          </span>
        </label>
      </li>

    </ul>

</template>
<script>
import axios from 'axios';
import { API_BASE_PATH } from '../config';

export default {
  name: 'ColorPicker',
  props: ['color'],
  model: {
    prop: 'color',
    event: 'color-change',
  },
  data() {
    return {
      ColorsData: null,
      colorLoading: false,
      colorLoadingFailed: false,
    };
  },
  created() {
    this.loadColors();
  },
  computed: {
    getColors() {
      return this.ColorsData ? this.ColorsData.items : [];
    },
    currentColor: {
      get() {
        return this.color;
      },
      set(value) {
        console.log(value);
        this.$emit('color-change', value);
      },
    },
  },
  methods: {
    loadColors() {
      this.colorLoading = true;
      clearTimeout(this.loadColorsTimer);
      this.loadColorsTimer = setTimeout(() => {
        return axios.get(API_BASE_PATH + '/api/colors')
        .then((response)=> this.ColorsData = response.data )
                .catch(() => this.productsLoadingFailed = true)
                .then(() => this.colorLoading = false)

      }, 8000);
            },
  },
};
</script>
<style>

</style>
