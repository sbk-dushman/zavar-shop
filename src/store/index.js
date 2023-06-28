import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [

    ],
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      const CartItem = state.cartProducts.find((item) => item.productId === productId);
      if (CartItem) {
        CartItem.amount += amount;
      } else {
        state.cartProducts.push(
          {
            productId,
            amount,
          },
        );
      }
    },
  },
});
