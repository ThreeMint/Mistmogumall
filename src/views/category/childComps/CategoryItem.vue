<template>
  <div id="category-item">
    <scroll class="content" ref="scroll">
      <div class="item-list">
        <div class="item" v-for="(item,index) in categoryData" :key="index">
          <div class="item-img">
            <img :src="item.image" @load="imgLoad" />
          </div>
          <span>{{item.title}}</span>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "CategoryItem",
  components: {
    Scroll
  },
  props: {
    categoryData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      count: 0
    };
  },
  methods: {
    imgLoad() {
      this.count++;
      if (this.count >= this.categoryData.length) {
        this.$refs.scroll.refresh();
        this.count = 0;
      }
    }
  }
};
</script>

<style scoped>
#category-item {
  height: calc(100% - 44px - 49px);
  width: calc(100% - 100px);
  margin-top: 2px;
}
.content {
  height: 100%;
  width: 100%;
}
.item-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
#category-item .item {
  position: relative;
  padding: 10px;
}

.item img {
  max-width: 90px;
  margin-bottom: 10px;
}
.item span {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
}
</style>