import i18n from '@/i18n'

// 在非组件中使用i18n需要加global
export function generateTitle(title) {
  return i18n.global.t('msg.route.' + title)
}
