<template>
  <van-swipe :autoplay="3000">
    <van-swipe-item v-for="(ban, index) in bannerArry" :key="index">
      <a href="#">
        <!-- <img :src="ban.image" /> -->
        <img v-lazy="ban.image" />
      </a>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: "SwiperItem",
  components: {},
  data() {
    return {
      fit: "contain",
    };
  },
  props: {
    bannerArry: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style >
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 100px;
  text-align: center;
}
.van-swipe-item img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>