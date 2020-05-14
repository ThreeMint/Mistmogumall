<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
// components\content\mainTabbar\MainTabBar.vue
// import MainTabBar from 'components/content/mainTabbar/MainTabBar'
import MainTabBar from "components/content/maintabbar/MainTabBar";
export default {
  name: "app",
  components: {
    MainTabBar
  }
};
</script>

<style scoped>
/*css 引入方式*/
@import "assets/css/base.css";
</style>
