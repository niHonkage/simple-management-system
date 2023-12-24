import i18n from '@/i18n'
import { watch } from 'vue'
import store from '@/store/index.js'

// 在非组件中使用i18n需要加global
export function generateTitle(title) {
  return i18n.global.t('msg.route.' + title)
}

export const watchSwitchLang = (...cbs) => {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach((cb) => cb(store.getters.language))
    }
  )
}
