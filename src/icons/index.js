import SvgIcon from '@/components/SvgIcon.vue'

// https://webpack.docschina.org/guides/dependency-management/#requirecontext
// 通过 require.context() 函数来创建自己的 context 1.要搜索的路径 2.是否继续搜索其子目录 3.匹配文件的正则
const svgRequire = require.context('./SVG', false, /\.svg$/)
// 此时返回一个 require 的函数，可以接受一个 request 的参数，用于 require 的导入。
// 该函数提供了三个属性，可以通过 require.keys() 获取到所有的 svg 图标
// 遍历图标，把图标作为 request 传入到 require 导入函数中，完成本地 svg 图标的导入
svgRequire.keys().forEach((svgIcon) => svgRequire(svgIcon))

export default app => {
  app.component('svg-icon', SvgIcon)
}
