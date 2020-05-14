<template>
  <nav-bar>
    <template v-slot:left>
      <div class="back" @click="backClick">
        <img src="~assets/img/common/arrow-left.svg" />
      </div>
    </template>
    <template v-slot:center>
      <div class="detail-nav">
        <div
          v-for="(item,index) in titles"
          :key="index"
          class="title-item"
          :class="{active: index === currentIndex}"
          @click="titleClick(index)"
        >{{item}}</div>
      </div>
    </template>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.detail-nav {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back {
  width: 100%;
  height: 44px;
}
.back img {
  margin-top: 7px;
  width: auto;
  height: auto;
  max-width: 70%;
  max-height: 70%;
}
</style>