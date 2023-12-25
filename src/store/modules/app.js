import { getItem, setItem } from '@/utils/storage'
import { LANG, TAGS_VIEWS } from '@/constant'

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    // 语言设置存储
    language: getItem(LANG) || '',
    tagsViewList: getItem(TAGS_VIEWS) || []
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLanguage(state, lang) {
      setItem(LANG, lang)
      state.language = lang
    },
    addTagsViewList(state, tag) {
      const isFind = state.tagsViewList.find((item) => {
        return item.path === tag.path
      })

      // 非重复的tag才能加入
      if (!isFind) {
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEWS, state.tagsViewList)
      }
    },
    changeTagsViewList(state, { index, tag }) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEWS, state.tagsViewList)
    },
    // 根据传递的种类进行对tag数组的操作
    removeTagsView(state, { type, index }) {
      if (type === 'index') {
        state.tagsViewList.splice(index, 1)
      } else if (type === 'other') {
        state.tagsViewList.splice(
          index + 1,
          state.tagsViewList.length - index + 1
        )
        state.tagsViewList.splice(0, index)
      } else if (type === 'right') {
        state.tagsViewList.splice(
          index + 1,
          state.tagsViewList.length - index + 1
        )
      }
      setItem(TAGS_VIEWS, state.tagsViewList)
    }
  }
}
