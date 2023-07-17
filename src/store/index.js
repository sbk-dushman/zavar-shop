import Vue from 'vue';
import Vuex from 'vuex';
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
    updatateCartProductsData(state, cartProductsData) {
      state.cartProductsData = cartProductsData;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => {
        return {
              productId: item.product.id,
              amount: item.quantity,

          }
    })
    },
  },
  getters: {
    cartProductsDitail(state) {
      return state.cartProducts.map((item) => {
        const productDitails = state.cartProductsData.find((p)=>p.product.id === item.productId).product;
         return {
          ...item,
          productDitails: {
            ...productDitails,
            img: productDitails.image.file.url,
          },
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
          userAccessKey: context.state.userAccessKey,
       }
      }).
        then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updatateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
      });
    },
    addProductToCart(context, { productId, amount }) {
      axios.post(API_BASE_PATH + '/api/baskets/products', {
        productId:productId,
        quantity:amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      }).then((response)=> {
        context.commit('updatateCartProductsData', response.data.items);
        context.commit('syncCartProducts');
      });
    },
  },
});
