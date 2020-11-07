import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  // addCart(state, payload) {
  // 添加新商品
  //方法1：使用for
  // let oldProduct = null;
  // for (let item of state.cartList) {
  //   if (item.iid === payload.iid) {
  //     oldProduct = item;
  //   }
  // }
  //方法2：使用数组函数find
  // 查找之前数组中，是否有该商品
  // let product = state.cartList.find(function (item) {
  //   return item.iid = payload.iid;
  // })
  // 上面的回调函数，可以写成箭头函数
  // let oldProduct = state.cartList.find(item => item.iid === payload.iid)
  // 2.判断oldProduct
  // if (oldProduct) { 这里使用方法1
  // if (oldProduct) {
  //   oldProduct.count += 1;
  // } else {
  //   payload.count = 1;
  //   state.cartList.push(payload);
  // }
  // }

  [ADD_COUNTER](state, payload) {
    // 这里的[ADD_COUNTER]是吧方法名,都封装为常量在./mutations-types
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true;
    state.cartList.push(payload);
  }

}
