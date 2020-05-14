<template>
  <div class="wrapper" ref="aaaa">
    <div class="content">
      <van-button type="default">默认按钮</van-button>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="info">信息按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
      <ul>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
        <li>s@</li>
      </ul>
    </div>
  </div>
</template>

<script>
//直接引入第三方插件框架，不是很好，不安全
import BScroll from "better-scroll";
export default {
  name: "Category",
  data() {
    return {
      scroll: null
    };
  },
  // created(){

  // },
  mounted() {
    this.scroll = new BScroll(document.querySelector(".wrapper"), {
      probeType: 3,
      pullUpLoad: true
    });
    // this.scroll = new BScroll(this.$refs.aaaa, {});

    this.scroll.on("scroll", position => {
      console.log(position);
    });
    this.scroll.on("pullingUp", () => {
      console.log("上啦");
    });
  }
};
</script>

<style scoped>
.wrapper {
  height: 150px;
  background-color: #f00;
  overflow: hidden;
}
</style>