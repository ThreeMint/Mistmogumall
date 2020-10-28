<template>
  <div id="profile">
    <div class="user">
      <div class="user-bar">
        <van-icon name="user-circle-o" size="24" />
        <van-icon class="bar-set" name="scan" size="24" />
        <van-icon class="bar-set" name="setting-o" size="24" />
      </div>
      <!-- 头像pic -->
      <div class="user-info">
        <van-image round width="100px" height="100px" :src="require('assets/img/user/1.jpg')" />
        <span>阿雾Ripples</span>
      </div>
      <div class="user-detail">
        <div class="user-detail-item">
          <i>22</i>
          <span>收藏夹</span>
        </div>
        <div class="user-detail-item">
          <i>8</i>
          <span>关注店铺</span>
        </div>
        <div class="user-detail-item">
          <i>0</i>
          <span>足迹</span>
        </div>
        <div class="user-detail-item">
          <i>0</i>
          <span>红包卡卷</span>
        </div>
      </div>
    </div>

    <div class="user-list">
      <div class="list-item order">
        <van-cell class="item-title" title="我的订单" is-link value="查看全部订单" />
        <div class="order-info">
          <div class="order-info-item">
            <van-icon name="pending-payment" size="24" color="#ff8198" />
            <span>待付款</span>
          </div>
          <div class="order-info-item">
            <van-icon name="send-gift-o" size="24" color="#ff8198" />
            <span>待发货</span>
          </div>
          <div class="order-info-item">
            <van-icon name="comment-o" size="24" color="#ff8198" />
            <span>评价</span>
          </div>
          <div class="order-info-item">
            <van-icon name="send-gift-o" size="24" color="#ff8198" />
            <span>退款/售后</span>
          </div>
        </div>
      </div>

      <div class="list-item tools">
        <van-cell class="item-title" title="必备工具" is-link value="查看全部工具" />
        <div class="order-info">
          <div class="order-info-item">
            <van-icon name="video" size="24" color="#ff8198" />
            <span>电影</span>
          </div>
          <div class="order-info-item">
            <van-icon name="vip-card" size="24" color="#0066CC" />
            <span>VIP专区</span>
          </div>
          <div class="order-info-item">
            <van-icon name="manager" size="24" color="#FF9933" />
            <span>专属客服</span>
          </div>
          <div class="order-info-item">
            <van-icon name="hot" size="24" color="#CC3333" />
            <span>火爆专区</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile"
};
</script>

<style scoped>
.user {
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: var(--color-tint);
}
.user-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 44px;
  color: #eee;
  padding-right: 20px;
}
.user-bar .bar-set {
  margin-left: 10px;
}
.user-info {
  display: flex;
  padding-left: 30px;
}
.user-info span {
  margin-left: 15px;
  font-size: 22px;
  line-height: 100px;
  color: #eee;
}
.user-detail {
  display: flex;
  margin: 20px 0 20px;
  /* padding: 0 25px; */
  color: #eee;
}
.user-detail-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 14px;
}
.user-detail-item i {
  font-style: normal;
  margin-bottom: 5px;
}
.user-list {
  background-color: #eee;
  height: 100vh;
}
.list-item {
  margin: 0 20px;
  border-radius: 15px;
  background-color: #fff;
}
.order-info {
  display: flex;
  /* margin: 10px 0 10px; */
  padding: 10px;
}
.order-info-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 12px;
}
.order-info-item span {
  margin-top: 5px;
}
.list-item.tools {
  margin-top: 20px;
}
.list-item .item-title {
  border-radius: 15px;
}
</style>