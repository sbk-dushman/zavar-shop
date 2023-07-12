<template>
  <ul class="colors">
              <li class="colors__item" v-for="(color,index) in getColors" :key="color.id" >
                <label class="colors__label">
                  <input class="colors__radio sr-only" v-model="currentColor" type="radio" :name="color.id" :value="color.id">
                <span class="colors__value" :style="`background-color:${color.code}`">
                  </span>
                </label>
              </li>
              <!-- <li class="colors__item">
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
              </li> -->
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
      clearTimeout(this.loadColorsTimer);
      this.loadColorsTimer = setTimeout(() => {
        return axios.get(API_BASE_PATH + '/api/colors')
        .then((response)=> this.ColorsData = response.data )

      }, 0);
            },
  },
};
</script>
<style>

</style>
