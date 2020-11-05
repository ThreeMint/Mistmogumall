<template>
  <div class="cart-item">
    <div class="item-selector">
      <van-checkbox v-model="product.checked" />
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="item-desc">商品描述: {{ product.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{ product.price }}</div>
        <div class="item-count right">x{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartListItem",
  props: {
    product: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.item-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12%;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-img {
  padding: 5px;
}
.item-img img {
  display: block;
  width: 80px;
  height: 100px;
  border-radius: 5px;
  object-fit: cover;
}
.item-info {
  font-size: 17px;
  position: relative;
  overflow: hidden;
  width: 88%;
  padding: 5px 10px;
  color: #333333;
}
.item-info .item-desc {
  font-size: 14px;
  margin-top: 15px;
  color: #666666;
}
.info-bottom {
  position: absolute;
  right: 10px;
  bottom: 10px;
  left: 10px;
  margin-top: 10px;
}
.info-bottom .item-price {
  color: #ff4500;
}
</style>