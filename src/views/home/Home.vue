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
  },
  activated() {
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
  },

  methods: {
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
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.tab-controll-fixed {
  position: relative;
  z-index: 9;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>