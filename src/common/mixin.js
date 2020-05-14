// 防抖函数导入
import {
  debounce
} from "./utils";
//这里使用了vue中的mixin混入
export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null,
      newRefresh: null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemImageListener = () => {
      // refresh();
      this.newRefresh();
    };
    this.$bus.$on('itemImageLoad', this.itemImageListener)
  }
}
