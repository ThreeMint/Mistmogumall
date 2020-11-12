import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  // 在actions中，参数有context上下文
  addCart(context, payload) {
    // actions可以返回一个Promise
    return new Promise((resolve, reject) => {
      // 添加新商品
      // 上面的回调函数，可以写成箭头函数
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      // 2.判断oldProduct
      // if (oldProduct) { 这里使用方法1
      if (oldProduct) {
        // 这样写，为了解构，同时可以追踪具体操作方法
        // oldProduct.count += 1;
        context.commit(ADD_COUNTER, oldProduct)

        resolve('当前商品+1')
      } else {
        payload.count = 1;
        // 同上
        // state.cartList.push(payload);
        context.commit(ADD_TO_CART, payload)
        resolve('添加新商品')
      }
    })



  }
}
