import { createI18n } from 'vue-i18n'
import mZhLocale from './lang/zh'
import mEnLocale from './lang/en'
import store from '@/store'

// 获取浏览器界面语言，默认语言
let currentLanguage = navigator.language.replace(/-(\S*)/, '')
// 从本地读取语言数据，如果存在优先使用
let locale = store.getters.language || ''
if (locale) {
  currentLanguage = locale
}

const message = {
  en: {
    msg: {
      ...mEnLocale
    }
  },
  zh: {
    msg: {
      ...mZhLocale
    }
  }
}

const i18n = createI18n({
  // 使用 composition API 需要设置成false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  message,
  locale: currentLanguage
})

export default i18n
