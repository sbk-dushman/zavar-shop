import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_PATH } from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: null,
    cartLoaded: false,
    deliveryPrice: 500,
    orderInfo: [],
  },
  mutations: {
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = null;
    },
    upadateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
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
    updatateCartProductsData(state, cartProductsData) {

      state.cartProductsData = cartProductsData;
      state.cartLoaded = true;
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
        const productDitails = state.cartProductsData.find((p) => p.product.id
        === item.productId).product;
        return {
          ...item,
          productDitails: {
            ...productDitails,
            img: productDitails.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartProductsDitail.reduce((acc, item) => (
        item.productDitails.price * item.amount) + acc, 0);
    },
    cartLoaded(state) {
      return state.cartLoaded;
    },
    getOrder(state) {
      return state.orderInfo;
    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
      return axios.get( API_BASE_PATH + '/api/orders/'+ orderId,{
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      }).then((response) => {
        context.commit('upadateOrderInfo', response.data);
      });
    },
    loadCart(context) {
      return axios.get( API_BASE_PATH + '/api/baskets',{
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updatateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    addProductToCart(context, { productId, amount }) {
      return (new Promise (resolve  =>setTimeout(resolve,2000)))
        .then(() => {
          return axios.post(API_BASE_PATH + '/api/baskets/products', {
          productId: productId,
          quantity: amount,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        }).then((response)=> {
          context.commit('updatateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        })
      })
    },
    updatateCartProductAmount(context, { productId, amount }) {
      if (amount < 1) {
      return;
      }
      context.commit('updatateCartProductAmount', { productId, amount });
      return axios.put(API_BASE_PATH + '/api/baskets/products', {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      }).then((response) => {
        context.commit('updatateCartProductsData', response.data.items);
      }).catch(() => {
        context.commit('syncCartProducts');
      });
    },
    deleteProductFromCart(context, productId) {
      context.commit('deleteCartProduct', productId);
      return axios.delete(API_BASE_PATH + '/api/baskets/products', {

        params: {
          userAccessKey: context.state.userAccessKey,
        },
        data: {
          productId,
        },

      }).then((response) => {
        context.commit('updatateCartProductsData', response.data.items);
        context.commit('syncCartProducts');
      }).catch(() => {

      });
    },
  },

});
