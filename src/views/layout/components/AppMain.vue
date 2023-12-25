<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { isTags } from '@/utils/tags.js'
import { useStore } from 'vuex'
import { generateTitle, watchSwitchLang } from '@/utils/i18n'

const route = useRoute()
const store = useStore()

// 生成国际化的title
const getTitle = route => {
  let title
  if (route.meta) {
    title = generateTitle(route.meta.title)
  } else {
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  }
  return title
}

watch(
  route,
  (to, from) => {
    if (!isTags(to.path)) return
    console.log(to)
    const { fullPath, meta, name, params, path, query } = to
    store.commit('app/addTagsViewList', {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    })
  },
  {
    immediate: true
  }
)

// 国际化 tags
watchSwitchLang(() => {
  store.getters.tagsViewList.forEach((route, index) => {
    store.commit('app/changeTagsViewList', {
      index,
      tag: {
        ...route,
        title: getTitle(route)
      }
    })
  })
})
</script>
<template>
  <div class="main">
    <router-view></router-view>
  </div>
</template>
<style lang="scss" scoped>
.main{
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
