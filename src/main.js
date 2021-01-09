import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import toast from 'components/common/toast'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(toast)
Vue.use(VueLazyLoad)

import {Button,
  Swipe,
  SwipeItem,
  Lazyload,
  Image as VanImage,
  Checkbox,
  Cell,
  Icon} from 'vant';
Vue.use(Button);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(VanImage);
Vue.use(Checkbox);
Vue.use(Cell);
Vue.use(Icon);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
