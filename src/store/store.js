import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// 1.安装插件
Vue.use(Vuex)

// 2.创建vuex实例,store对象
// 2.1 可以把state抽出来
const state = {
  cartList: []
}

const store = new Vuex.Store({
  state,
  // mutations唯一目的是修改state中的状态
  // 其中的每个方法，尽可能完成的事件比较单一
  // 最好一个方法做一个操作，这样可以很好的在调式工具里追踪
  mutations,
  actions,
  getters
})

// 3.挂载到Vue实例上，这里要导出
export default store
