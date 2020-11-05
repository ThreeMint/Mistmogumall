<template>
  <div class="cart-bottom">
    <div class="cart-bottom-check">
      <van-checkbox v-model="isSelectedAll" @click="checkedAllClick">全选</van-checkbox>
    </div>

    <!-- 合计 -->
    <div class="cart-bottom-price">
      <span>合计：{{totalPrice}}</span>
    </div>

    <!-- 结算 -->
    <div class="cart-bottom-btn" @click="calcClick">
      <span>提交订单({{ checkedLength }})</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter(item => {
            return item.checked === true;
          })
          .reduce((prevalue, item) => {
            return prevalue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    // 已选择的商品
    // 这里的this.cartList是辅助函数mapGetters映射过的
    checkedLength() {
      return this.cartList.filter(item => item.checked === true).length;
    },
    // 这里使用get，set是因为vant中需要v-model绑定计算属性
    isSelectedAll: {
      // if (this.cartList.length === 0) return false;
      // return !this.cartList.find(item => !item.checked);
      get() {
        if (this.cartList.length === 0) return false;
        // 1.使用filter
        // return !this.cartList.filter(item => !item.checked).length;
        // 2.使用find
        return !this.cartList.find(item => !item.checked);
      },
      set(val) {
        return val;
      }
    }
  },
  methods: {
    checkedAllClick() {
      if (this.isSelectedAll) {
        //全部选中
        this.cartList.forEach(item => (item.checked = false));
      } else {
        //部分或全部不选中
        this.cartList.forEach(item => (item.checked = true));
      }
    },
    calcClick() {
      if (!this.checkedLength) {
        //没有全部选择
        this.$toast.show("请选择购买的商品", 2000);
      }
    }
  }
};
</script>

<style scoped>
.cart-bottom {
  font-size: 15px;
  position: fixed;
  right: 0;
  bottom: 50px;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  border-top: 1px solid #cccccc;
}
.cart-bottom-price {
  margin-left: 50px;
}
.cart-bottom-price span {
  color: red;
}
.cart-bottom-btn span {
  line-height: 50px;
  position: absolute;
  right: 0;
  bottom: 0;
  display: block;
  height: 50px;
  padding: 0 15px;
  color: white;
  border: 0;
  outline: none;
  background: linear-gradient(to right, #f0a8d8, #ff5777);
}
.cart-bottom-btn span:active {
  opacity: 0.8;
}
</style>