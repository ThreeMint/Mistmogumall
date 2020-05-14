<template>
  <swiper>
    <swiper-item :bannerArry="banners"></swiper-item>
  </swiper>
</template>

<script>
import Swiper from "components/common/swiper/Swiper";
import SwiperItem from "components/common/swiper/SwiperItem";

export default {
  name: "MainSwiper",
  props: {
    banners: {
      type: Array
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style>
</style>