import dayjs from 'dayjs'
// 展示相对时间的插件
import rt from 'dayjs/plugin/relativeTime'
// 国际化语言包
import 'dayjs/locale/zh-cn'
import store from '@/store'

export const dayFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}

// 加载相对时间的插件
dayjs.extend(rt)
function relativeTime(val) {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  // 从现在到传入值的相对时间
  return dayjs()
    .locale(store.getters.language === 'zh' ? 'zh-cn' : 'en')
    .to(dayjs(val))
}

export default (app) => {
  app.config.globalProperties.$filters = { dayFilter, relativeTime }
}
