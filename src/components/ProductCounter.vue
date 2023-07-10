<template>
  <!-- form__counter-->

     <div :class="counterClass">
                <button :class="(currentAmaunt-1==0 ? 'is-off':'')"

                @click.prevent="decrement(currentAmaunt)"
                type="button" aria-label="Убрать один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" v-model.number="currentAmaunt" name="count">

                <button  @click.prevent="incriment(currentAmaunt)" type="button" aria-label="Добавить один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>
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
    incriment(value) {
      this.currentAmaunt = value + 1;
    },
    decrement(value) {
      this.currentAmaunt = value - 1;
    },

  },

};

</script>
<style>
button{
  cursor: pointer;
}
.is-off{
cursor: not-allowed;
pointer-events: none;
opacity: 0.5;
}
</style>
