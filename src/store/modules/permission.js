import { publicRoutes, asyncRoutes } from '@/router'

export default {
  namespaced: true,
  state: {
    // 初始路由表
    route: publicRoutes
  },
  mutations: {
    // 设置新增路由
    setNewRoute(state, newRoutes) {
      state.route = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    // 根据权限筛选路由
    filterRoutes(context, menus) {
      const routes = []
      menus.forEach((key) => {
        routes.push(...asyncRoutes.filter((item) => item.name === key))
      })
      // 所有不匹配的路由都进入404的路由配置
      // 注意：需要在所有路由被指定后，也就是动态赋值后添加
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      context.commit('setNewRoute', routes)
      return routes
    }
  }
}
