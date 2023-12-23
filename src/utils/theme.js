import color from 'css-color-function'
import rgbHex from 'rgb-hex'
import formula from '@/constant/color-function/formula.json'
import axios from 'axios'

/**
 * 写入新样式到 style
 *
 */
export const writeNewStyle = (elNewStyle) => {
  const style = document.createElement('style')
  style.innerText = elNewStyle
  document.head.appendChild(style)
}

/**
 * 根据主色值，生成最新的样式表
 */
export const generateNewStyle = async (primaryColor) => {
  const colors = generateColors(primaryColor)
  let cssText = await getOriginalStyle()

  // 4.遍历生成的样式表，在css的原样式中进行全局替换
  Object.keys(colors).forEach((key) => {
    cssText = cssText.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + colors[key]
    )
  })

  return cssText
}

// 1.根据主色生成色值表
export const generateColors = (primary) => {
  if (!primary) return
  const colors = { primary }
  Object.keys(formula).forEach((key) => {
    const value = formula[key].replace(/primary/g, primary)
    // 转换rgb颜色成16进制
    colors[key] = '#' + rgbHex(color.convert(value))
  })
  return colors
}

// 2.获取当前elemen-plus的默认样式表
export const getOriginalStyle = async () => {
  const version = require('element-plus/package.json').version
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios(url)
  // 把获取到的数据筛选成原样式模板
  return getStyleTemplate(data)
}

// 3.返回样式模板
export const getStyleTemplate = (data) => {
  // element-plus 默认色值
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }
  // 根据默认色值为要替换的色值打上标记：具体来说就是把传入的 #xxx 色值一致的样式的值替换成map里面对应的文字
  Object.keys(colorMap).forEach((key) => {
    const value = colorMap[key]
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data
}
