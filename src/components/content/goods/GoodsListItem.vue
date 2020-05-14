<template>
  <div class="goods-item" @click="itemClick">
    <!-- @load="imageLoad"监听图片加载，这里每加载一个图片，则执行该绑定的函数 -->
    <img :src="showImage" alt @load="imageLoad" />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    showImage() {
      //因为在其他组件里也需要取图片，但是属性名不同，需要判断
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  methods: {
    imageLoad() {
      // this.$bus.$emit('自定义事件')，事件总线，用于发送事件等
      this.$bus.$emit("itemImageLoad");
    },
    itemClick() {
      // console.log("跳转链接");
      this.$router.push("/detail/" + this.goodsItem.iid);
    }
  }
};
</script>
<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  position: absolute;
  left: 0;
  bottom: 5px;
  right: 0;
  overflow: hidden;
  font-size: 12px;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  /* 弹性伸缩盒子模型显示 */
  display: -webkit-box;
  /* 限制在一个块元素显示的文本的行数 */
  -webkit-line-clamp: 1;
  /* 设置或检索伸缩盒对象的子元素的排列方式 */
  -webkit-box-orient: vertical;
}
.goods-info .price {
  color: #f00;
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/favourite.svg") 0 0/14px 14px;
}
</style>