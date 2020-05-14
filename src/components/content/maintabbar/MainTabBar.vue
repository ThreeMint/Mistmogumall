<template>
  <tab-bar class="tab-bar">
    <tab-bar-item path="/home">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt />
      <img slot="item-icon-active" src="~assets/img/tabbar/home-active.svg" alt />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <!-- 这个具名插槽是最新的写法 -->
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/category.svg" alt />
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/category-active.svg" alt />
      </template>
      <template v-slot:item-text>
        <div>分类</div>
      </template>
      <!-- <img slot="item-icon" src="./assets/img/tabbar/home.svg" alt="">
      <div slot="item-text" >首页</div>-->
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt />
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart-active.svg" alt />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/mine.svg" alt />
      <img slot="item-icon-active" src="~assets/img/tabbar/mine-active.svg" alt />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
// import TabBar from 'components/common/tabbar/Tabbar'
// import TabBarItem from 'components/common/tabbar/TabBarItem'

import { TabBar, TabBarItem } from "components/common/tabbar";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style>
.tab-bar {
  z-index: 8;
}
</style>