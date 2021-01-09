<template>
  <div>
    <!-- van- -->
    <!-- <swiper :autoplay="3000">
      <swiper-item v-for="(ban, index) in banners" :key="index">
        <a href="#">
          <img :src="ban.image" @load="imageLoad" />
        </a>
      </swiper-item>
    </swiper> -->

    <main-swiper :banners="banners" />
  </div>
</template>

<script>
import MainSwiper from "components/content/mainswiper/MainSwiper";
//轮播图用的ui框架里的
// import { Swiper, SwiperItem } from "components/common/swiper";

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
    // Swiper,
    // SwiperItem,
    MainSwiper,
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