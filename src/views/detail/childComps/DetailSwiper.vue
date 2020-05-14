<template>
  <div class="detail-swiper">
    <van-swipe :autoplay="3000" class="swiper">
      <van-swipe-item v-for="(item, index) in topImages" :key="index">
        <!-- <img :src="item" /> -->
        <van-image :src="item" fit="cover" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
//导入van UI框架组件
import { Image as VanImage } from "vant";
export default {
  name: "DetailSwiper",
  components: {
    VanImage
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.swiper {
  height: 300px;
  overflow: hidden;
}
</style>