import { createStore } from 'vuex'
import user from './modules/user.js'
import app from './modules/app.js'
import variables from '@/style/variables.module.scss'

export default createStore({
  state: {},
  getters: {
    token: (state) => state.user.token,
    userInfo: (state) => state.user.userInfo,
    hasUserInfo: (state) => JSON.stringify(state.user.userInfo) !== '{}',
    cssVar: (state) => variables,
    sidebarOpened: (state) => state.app.sidebarOpened
  },
  mutations: {},
  actions: {},
  modules: {
    user,
    app
  }
})
