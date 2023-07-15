import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';
import axios from 'axios';
import { API_BASE_PATH } from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [

    ],
    userAccessKey: null,
    cartProductsData: null,
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
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updatateCartProductsData(state, cartProductsData ) {
      state.cartProductsData = cartProductsData;
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
  actions: {
    loadCart(context) {

      axios.get( API_BASE_PATH + '/api/baskets',{
         params: {
        accessKey: context.state.userAccessKey,
       }
      }).
      then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
        context.commit('updatateCartProductsData', response.data.items);
      });
    },
  },
});
