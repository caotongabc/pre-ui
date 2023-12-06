import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import setting from './modules/setting'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    setting
  },
  getters,
  mutations: {
    setUser: function(modules, adva) {
      modules.user.avatar = adva
    }
  },
  actions: { // 使用解构赋值，参数列表{commit,state}
    setUseradvatar({ commit, modules }, adva) {
      console.log(adva)
      // commit 调用mutations的方法
      commit('setUser', adva) // 用于提交mutations方法，传递城市名称
    }
  }
})

export default store
