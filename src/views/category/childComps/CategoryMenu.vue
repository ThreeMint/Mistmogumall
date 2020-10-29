<template>
  <div id="category-menu">
    <scroll class="content">
      <div class="menu-list">
        <div
          class="menu-item"
          :class="{active: index===currentIndex}"
          v-for="(item, index) in categories"
          :key="index"
          @click="itemClick(index)"
        >{{item.title}}</div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "CategoryMenu",
  components: {
    Scroll
  },
  props: {
    categories: Array
  },
  data() {
    return {
      currentIndex: 0
    };
  },

  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("selectItem", index);
    }
  }
};
</script>

<style scoped>
#category-menu {
  background-color: #f6f6f6;
  height: calc(100vh - 44px - 49px);
  width: 100px;
  box-sizing: border-box;
}
.content {
  height: 100%;
  overflow: hidden;
}
.menu-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}
.menu-item.active {
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
</style>