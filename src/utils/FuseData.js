import path from 'path'
import i18n from '@/i18n'

// 筛选出符合要求的路由对象
export const generateRoutes = (routes, basepath = '/', prefixTitle = []) => {
  // 创建result数组
  const result = []
  // 循环路由
  for (const route of routes) {
    // 创建包含 path 和 title 的item
    // 1. 注入path和预设的title
    const data = {
      path: path.resolve(basepath, route.path),
      title: [...prefixTitle]
    }
    // 当存在meta时候，使用i18n解析数据并生成新的title
    // 动态路由不能被搜索：就是路径里面带 /: 的
    // 2. 注入匹配到的title
    const reg = /.*\/:.*/
    if (route.meta && route.meta.title && !reg.exec(route.path)) {
      const i18nTitle = i18n.global.t(`msg.route.${route.meta.title}`)
      // 解构字符串成一个个的关键字
      data.title = [...data.title, i18nTitle]
      result.push(data)
    }

    // 3. 存在 children 时需要递归调用
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length >= 1) {
        result.push(...tempRoutes)
      }
    }
  }
  return result
}
