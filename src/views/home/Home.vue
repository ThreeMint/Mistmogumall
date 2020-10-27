<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物天堂</div>
      </template>
    </nav-bar>

    <tab-controll
      :titles="['热门','精选','优惠']"
      @tabClick="tabClick"
      ref="tabControl2"
      class="tab-controll-fixed"
      v-show="isShowTabControl"
    />

    <!-- @scroll="contentScroll" 是子传父,@scroll是在子组件自定义,"contentScroll"是父组件定义接收-->
    <!-- @pullingUp="loadmore" 上拉加载更多，目前已取消 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <!--  class="tab-controll" -->
      <tab-controll :titles="['热门','精选','优惠']" @tabClick="tabClick" ref="tabControl" />
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper"; // 轮播图
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView"; //导入热门商品

// 顶部栏是公共的
import NavBar from "components/common/navbar/NavBar";
import TabControll from "components/content/tabControll/TabControll";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll"; //滚动插件封装
import BackTop from "components/content/backTop/BackTop";

// 网络请求
import { getHomeMultidata, getHomeGoods } from "network/home";
// 防抖函数导入
import { debounce } from "common/utils";
// 引入混入，重复使用生命周期mounted的代码
import { itemListenerMixin } from "common/mixin";
export default {
  name: "Home",
  components: {
    // MainSwiper,
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControll,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isShowTabControl: false,
      saveY: 0
      //这里因为和detail使用相同的变量，同样可以抽取到Minxin
      // itemImageListener: null,
    };
  },
  //混入属性， 这里用与抽取重复代码，mounted中的
  mixins: [itemListenerMixin],

  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    // 1.请求多个数据,异步操作,这里调用的是methods
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //这里使用了vue中的mixin属性混入: [itemListenerMixin],
    /**
     // 3.监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    // 3.1 保存到itemImageListener变量
    this.itemImageListener = () => {
      // this.$refs.scroll.refresh();
      refresh();
    };
    // 3.2 执行
    this.$bus.$on("itemImageLoad", this.itemImageListener);
     */
    // 获取tabControl的offsetTop,但是这里的值不正确，image可能没有渲染完成
    // this.tabOffsetTop = this.$refs.tabControl
  },
  activated() {
    //激活
    // this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    //失去激活
    // 1.保存Y的值
    this.saveY = this.$refs.scroll.getScrollY();
    // 2.取消全局事件的监听,因为在detail中，推荐里的img也加载，
    // 会导致home里也调用refresh()，这里目的是在detail中，不让home调用refresh()函数
    this.$bus.$off("itemImageLoad", this.itemImageListener);
  },
  destroyed() {
    //销毁
  },

  methods: {
    /**事件监听 */
    // 重要：防抖函数,这里用于当一个函数调用频繁，用来节流，防止多次调用
    // 当设置一个定时器后，每次加载图片都会执行
    // debounce(func, delay) {
    //  ....
    // },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      // this.$refs.scroll获取的是组件,里面有方法
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 组件距离判断
    contentScroll(position) {
      //1.判断返回按钮是否显示
      this.isShowBackTop = -position.y > 1000;
      //2.判断tabControll是否吸顶
      this.isShowTabControl = -position.y > this.tabOffsetTop;
    },
    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
      // this.$refs.scroll.scroll.refresh();
    },
    swiperImageLoad() {
      //当轮播图片加载完成，再获取距离
      //动态赋值，tabcontrol栏与顶部的距离
      // console.log(this.$refs.tabControl.$el.offsetTop);

      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
    /**网络请求 */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 上拉加载
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  /* padding-bottom: 800px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
  background-color: var(--color-tint);
  color: #fff;
}
.tab-controll-fixed {
  position: relative;
  z-index: 9;
}
/* sticky太新了，不兼容 */
/* .tab-controll {
  position: sticky;
  top: 44px;
  z-index: 11;
} */

/* 两种方案, 整个视口减去上下的栏,剩下中间的 */
/* .content {
  height: calc(100% - 93px);
  margin-top: 44px;
  overflow: hidden;
} */
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>