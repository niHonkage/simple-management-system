import path from 'path'
// 获取所有的子集路由
const getChildrenRoutes = (routes) => {
  const result = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

// 处理脱离层级的路由
export const filterRouters = (routes) => {
  // 根据所有的子集路由进行查重操作
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter((route) => {
    // 剔除所有重复的路由数据
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path
    })
  })
}

function isNull(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
}

// 根据filterRoutes的数据返回对应的 menu 规则数据
// 使用递归遍历整个数据结构
export const generateMenus = (routes, basePath = '') => {
  const result = []
  routes.forEach((item) => {
    // 不存在children && 不存在meta 直接过滤掉
    if (isNull(item.children) && isNull(item.meta)) return
    // 存在children && 不存在meta 递归generateMenus
    if (!isNull(item.children) && isNull(item.meta)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 不存在children && 存在meta || 二者都存在
    // 因为最终的menu需要进行跳转，此时需要合并path
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，可能存在同名父路由的情况
    let route = result.find((item) => item.path === routePath)
    // 当前 路由尚未加入到result
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // icon && title
      if (route.meta.icon && route.meta.title) {
        result.push(route)
      }
    }
    // 二者都存在的情况
    if (!isNull(item.children)) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
