import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

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
    updatateCartProductAmount(state, { productId, amount }) {
      const CartItem = state.cartProducts.find((item) => item.productId === productId);
      if (CartItem) {
        CartItem.amount = amount;
      }
    },
  },
  getters: {
    cartProductsDitail(state) {
      return state.cartProducts.map((item) => {
         return {
          ... item,
          productDitails: products.find(p=>p.id=== item.productId)
        }
    });
    },
    cartTotalPrice(state, getters) {
      return getters.cartProductsDitail.reduce((acc, item) => (
        item.productDitails.price * item.amount) + acc, 0);
    },
  },
});
