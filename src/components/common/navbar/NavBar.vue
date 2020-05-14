<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style>
.nav-bar {
  /* flex布局 */
  display: flex;

  /* 一般高度44px, 有内容的时候，才会出现高度 */
  line-height: 44px;
  height: 44px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(100, 100, 100, 1);
}

.left,
.right {
  /* flex: 1; */
  width: 60px;
  /* background-color: red; */
}

.center {
  flex: 1;
  /* background-color: blue; */
}
</style>