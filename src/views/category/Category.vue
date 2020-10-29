<template>
  <div id="category">
    <nav-bar class="category-nav">
      <template v-slot:center>分类</template>
    </nav-bar>
    <category-menu :categories="categories" @selectItem="selectItem" />
    <!-- 分类右侧显示 -->
    <category-item :categoryData="categoryData" class="category-item" />
  </div>
</template>

<script>
// 子组件
import CategoryMenu from "./childComps/CategoryMenu";
import CategoryItem from "./childComps/CategoryItem";
// 公共的
import NavBar from "components/common/navbar/NavBar";
// 网络请求
import { getCategory, getCategoryInfo } from "network/category";
//滚动插件封装,封装好的
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "Category",
  components: {
    CategoryMenu,
    CategoryItem,
    NavBar,
    Scroll
  },
  data() {
    return {
      scroll: null,
      categories: [], //列表分类menu
      categoryData: [], //每个分类的详情
      categoryItem: []
    };
  },
  created() {
    // 获取分类数据
    this._getCategory();
  },
  methods: {
    _getCategory() {
      // 获取分类数据
      getCategory().then(resolve => {
        this.categories = resolve.data.category.list;
        // 第一次进入需要显示商品
        this._getCategoryItem(0);
      });
    },
    _getCategoryItem(index) {
      // 每个分类的key
      const mailKey = this.categories[index].maitKey;
      //获取详情item
      getCategoryInfo(mailKey).then(resolve => {
        this.categoryData = resolve.data.list;
      });
    },
    // 响应子组件事件-分类点击
    selectItem(index) {
      this._getCategoryItem(index);
    }
  }
};
</script>

<style scoped>
.category {
  position: relative;
}
.category-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.category-item {
  position: absolute;
  left: 100px;
  top: 44px;
  overflow: hidden;
}
</style>