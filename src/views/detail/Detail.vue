<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick" />
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper ref="swiper" :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-params-info ref="params" :param-info="paramsInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="goods" :goods="recommends" />
    </scroll>
    <detail-bottom-bar />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamsInfo from "./childComps/DetailParamsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
//网络请求相关
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
// 防抖函数导入
import { debounce } from "common/utils";
// 引入混入，重复使用生命周期mounted的代码
import { itemListenerMixin } from "common/mixin";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
  },
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0
      //这里因为和detail使用相同的变量，同样可以抽取到Minxin
      // itemImageListener: null
    };
  },
  //混入属性， 这里用于抽取重复代码，mounted中的
  mixins: [itemListenerMixin],
  created() {
    // 1.保存传入的id
    this.id = this.$route.params.iid;

    // 2.根据id请求详情数据
    getDetail(this.id).then(res => {
      const data = res.result;
      // 1.图片轮播图
      this.topImages = data.itemInfo.topImages;

      // 2.商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.商家信息
      this.shop = new Shop(data.shopInfo);
      // 4.详情图片数据
      this.detailInfo = data.detailInfo;
      // 5.获取商品参数
      this.paramsInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.评论
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      /**
       * 这里值不对，原因：this.$refs.params.$el根本没渲染
       * this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        console.log(this.themeTopYs);
       */
      /* this.$nextTick(() => {
        // 值依然不对，原因：图片没有计算出来
        // 根据最新的数据，对应的DOM是已经被渲染出来
        // 但是图片依然是没有加载完(目前获取到offsetTOP不包含图片)
        // offsetTop值不对的时候，都是因为图片的问题
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.goods.$el.offsetTop);
        console.log(this.themeTopYs);
      }); */
    });

    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
  },
  mounted() {
    //这里使用了vue中的mixin混入
    /**
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.itemImageListener = () => {
      refresh();
    };
    this.$bus.$on('itemImageLoad', this.itemImageListener)
    */
  },
  destroyed() {
    // 2.取消全局事件的监听,因为在detail中，推荐里的img也加载，
    // 会导致home里也调用refresh()，这里目的是在detail中，不让home调用refresh()函数
    // console.log("----deactivated----");

    this.$bus.$off("itemImageLoad", this.itemImageListener);
  },
  methods: {
    imageLoad() {
      // this.$refs.scroll.refresh();
      this.newRefresh();
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.goods.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 150);
    },
    contentScroll(position) {
      // console.log(position);
      // 1.获取Y值
      const positionY = -position.y;

      /* 2.positionY和主题中的值比较
        [0, 1300, 5050, 9954]
        positionY 在 0 和 1300 之间，index = 0
        positionY 在 1300 和 5050 之间，index = 1
        positionY 在 5050 和 9954 之间，index = 2

        positionY 在 大于等于 9954，index = 3
      */
      let length = this.themeTopYs.length;
      /* for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
          // console.log(this.currentIndex);
        }
      } */

      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  /* calc(值 - 值)，中间的括号必须分开 */
  height: calc(100% - 44px);
  padding-top: 5px;
}
</style>