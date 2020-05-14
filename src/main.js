import Vue from 'vue'
import App from './App.vue'
import router from './router'
// vant ui框架
import vant from './plugins/vant'

Vue.config.productionTip = false

// 默认情况下$bus是没有值的，需要赋值Vue实例
Vue.prototype.$bus = new Vue()
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
