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
        // 处理用户权限
        const { permission } = await store.dispatch('user/getUserInfo')
        // 获取筛选后的路由
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        // 遍历数组添加到路由表中
        filterRoutes.forEach((route) => {
          router.addRoute(route)
        })
        // 添加后需要跳转立即触发更新
        return
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
