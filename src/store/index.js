import { createStore } from 'vuex'
import user from './modules/user.js'
import app from './modules/app.js'
import theme from './modules/theme.js'
import { generateColors } from '@/utils/theme.js'
import { getItem } from '@/utils/storage.js'
import { MAIN_COLOR } from '@/constant/index.js'

export default createStore({
  state: {},
  getters: {
    token: (state) => state.user.token,
    userInfo: (state) => state.user.userInfo,
    hasUserInfo: (state) => JSON.stringify(state.user.userInfo) !== '{}',
    cssVar: (state) => {
      return {
        ...state.theme.variables,
        ...generateColors(getItem(MAIN_COLOR))
      }
    },
    sidebarOpened: (state) => state.app.sidebarOpened,
    language: (state) => state.app.language,
    mainColor: (state) => state.theme.mainColor,
    tagsViewList: (state) => state.app.tagsViewList
  },
  mutations: {},
  actions: {},
  modules: {
    user,
    app,
    theme
  }
})
