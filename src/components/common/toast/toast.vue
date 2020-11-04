<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
import { debounce } from "common/utils";
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: ""
    // },
    // show: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      message: "",
      isShow: false
    };
  },
  methods: {
    /* 在ES6以前的语法中， 
        message = message || '默认文字'
        time = time || 1500 
      需要这么写，赋予默认值
      在ES6中，新增语法，可直接在参数上写默认值
      show(message='默认文子', time=1500) 

    */
    show(message = "默认文字", time = 1500) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, time);
    }
  }
};
</script>

<style scoped>
.toast {
  font-size: 16px;
  position: fixed;
  z-index: 1000;
  top: 50%;
  left: 50%;
  margin: auto;
  padding: 8px 15px;
  transform: translate(-50%, -50%);
  color: white;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 999;
}
</style>