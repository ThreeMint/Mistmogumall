import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
// vant ui框架
import vant from './plugins/vant'

// 自定义的Toast插件,因为导出是default，所以可以自定义名
import toast from 'components/common/toast'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 默认情况下$bus是没有值的，需要赋值Vue实例
Vue.prototype.$bus = new Vue()

//使用自定义插件,当使用该插件时，会先自动调用插件中的 install函数
Vue.use(toast)
// 使用图片懒加载插件,具体参数看github
Vue.use(VueLazyLoad)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
