<template>
  <!-- BScroll插件 尽量用ref获取组件/元素  -->
  <div class="warpper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      //上拉加载设置
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true, //限制div等元素点击,不限制button
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    // 2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        this.$emit("scroll", position); //自定义事件,传值
      });
    }

    // 3.监听上拉加载事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
        // console.log("监听到上拉");
      });
    }
  },
  methods: {
    //ES6语法,这里给了一个默认值
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
    },
    refresh() {
      // console.log("--refresh----");
      this.scroll && this.scroll.refresh && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  }
};
</script>


<style scoped>
/* scoped是作用域的意思，只在当前使用 */
</style>