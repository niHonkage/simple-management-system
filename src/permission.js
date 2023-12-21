import router from '@/router/index.js'
import store from './store/index.js'

// 白名单
const whiteList = ['/login']

// 路由前置守卫
router.beforeEach(async (to, from) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      return '/'
    } else {
      // 满足存在token且前往非登录页，需要判断用户信息是否被获取，
      // 如果不存在用户信息则需要获取
      if (!store.getters.hasUserInfo) {
        await store.dispatch('user/getUserInfo')
      }
      return true
    }
  } else {
    // 没有token的情况，仅可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      return true
    } else {
      return '/login'
    }
  }
})
