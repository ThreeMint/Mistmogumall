<template>
  <div class="cart">
    <nav-bar class="cart-nav">
      <template v-slot:center>
        <div>购物车</div>
      </template>
    </nav-bar>

    <h2>购物车</h2>
  </div>
</template>

<script>
// 顶部栏是公共的
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "Cart",
  components: {
    NavBar
  }
};
</script>

<style scoped>
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>