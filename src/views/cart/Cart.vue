<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="cart-nav">
      <template v-slot:center>
        <div>购物车({{ length }})</div>
      </template>
    </nav-bar>

    <!-- 列表 -->
    <cart-list />

    <!-- 底部结算 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";

// vue中还有一个...mapGatters()辅助函数,
// 可以帮助store中的gatter映射到局部计算属性中
import { mapGetters } from "vuex";

export default {
  name: "Cart",

  computed: {
    // cartLength() {
    //   return this.$store.getters.cartLength;
    // }

    // 辅助函数有两种语法
    // 1.直接写vuex中store的getters里的方法
    // ...mapGatters(['cartLength','cartList'])
    // 2.可以自定义名
    ...mapGetters({
      length: "cartLength",
    }),
  },
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
};
</script>

<style scoped>
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>