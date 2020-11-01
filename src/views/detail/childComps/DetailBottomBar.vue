<template>
  <div class="bottom-bar">
    <div class="bottom_left">
      <div class="service">
        <i class="icon"></i>
        <span>客服</span>
      </div>
      <div class="shop">
        <i class="icon"></i>
        <span>店铺</span>
      </div>
      <div class="collect">
        <i class="icon"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bottom_right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
      this.$emit("addCart");
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 49px;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  text-align: center;
  font-size: 0.8rem;
}
.bottom_left {
  display: flex;
  flex: 1;
  color: rgb(139, 138, 138);
}
.bottom_left > div {
  flex: 1;
  border-right: 0.04rem solid rgba(128, 128, 128, 0.2);
}
.bottom_left .icon {
  display: block;
  /* background: url("~assets/img/detail/detail_bottom.png") 0 0/100%; */
  width: 1.5rem;
  height: 1.5rem;
  max-width: 100%;
  margin: 0.12rem auto;
}
.service .icon {
  background: url("~assets/img/detail/chat.svg") 0 0/100% no-repeat;
  background-color: red;
  -webkit-mask: url("~assets/img/detail/chat.svg") no-repeat 0 0/100%;
  mask: url("~assets/img/detail/chat.svg") no-repeat 0 0/100%;
}
.shop .icon {
  background: url("~assets/img/detail/box-alt.svg") 0 0/100% no-repeat;
}
.collect .icon {
  background: url("~assets/img/detail/box.svg") 0 0/100% no-repeat;
}
.bottom_right {
  flex: 1;
  display: flex;
}
.bottom_right > div {
  flex: 1;
  line-height: 3.09rem;
}
.cart {
  background-color: rgb(255, 174, 0);
}
.buy {
  background-color: var(--color-tint);
  color: white;
}
</style>

