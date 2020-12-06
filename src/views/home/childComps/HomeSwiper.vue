<template>
  <div>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(ban, index) in banners" :key="index">
        <a href="#">
          <img :src="ban.image" @load="imageLoad" />
        </a>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
//轮播图用的ui框架里的
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isImageLoad: false,
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imageLoad() {
      if (!this.isImageLoad) {
        this.$emit("swiperImageLoad");
        this.isImageLoad = true;
      }
    },
  },
};
</script>

<style>
</style>