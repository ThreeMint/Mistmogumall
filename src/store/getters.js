// 其他地方想使用getters的东西时，
// 可以使用  ( ...mapGetter )  辅助函数
// vue中还有一个...mapGatters()辅助函数,
// 可以帮助store中的gatter映射到局部计算属性中
export default {
  cartLength(state) {
    return state.cartList.length;
  },
  cartList(state) {
    return state.cartList;
  }
}
