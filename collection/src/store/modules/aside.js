// import shop from '../../api/shop'
import * as types from '../mutation-types';

// initial state
// shape: [{ id, quantity }]
const state = {
  // added: [],
  asideStatus: false
}

// getters
const getters = {
  asideStatus: state => state.asideStatus

  // cartProducts: (state, getters, rootState) => {
  //     return state.added.map(({ id, quantity }) => {
  //         const product = rootState.products.all.find(product => product.id === id)
  //         return {
  //             title: product.title,
  //             price: product.price,
  //             quantity
  //         }
  //     })
  // },

  // cartTotalPrice: (state, getters) => {
  //     return getters.cartProducts.reduce((total, product) => {
  //         return total + product.price * product.quantity
  //     }, 0)
  // }
}

// actions
// const actions = {
//     checkout({ commit, state }, products) {
//         const savedCartItems = [...state.added]
//         commit(types.SET_CHECKOUT_STATUS, null)
//             // empty cart
//         commit(types.SET_CART_ITEMS, { items: [] })
//         shop.buyProducts(
//             products,
//             () => commit(types.SET_CHECKOUT_STATUS, 'successful'),
//             () => {
//                 commit(types.SET_CHECKOUT_STATUS, 'failed')
//                     // rollback to the cart saved before sending the request
//                 commit(types.SET_CART_ITEMS, { items: savedCartItems })
//             }
//         )
//     }
// }

// mutations
const mutations = {
  // [types.COLLAPSE_ASIDE](state, { id }) {
  //     state.checkoutStatus = null
  //     const record = state.added.find(product => product.id === id)
  //     if (!record) {
  //         state.added.push({
  //             id,
  //             quantity: 1
  //         })
  //     } else {
  //         record.quantity++
  //     }
  // },

  [types.COLLAPSE_ASIDE] (state) {
    state.asideStatus = true
  },

  [types.EXPAND_ASIDE] (state) {
    state.asideStatus = false
  }
}

export default {
  state,
  getters,
  // actions,
  mutations
}
