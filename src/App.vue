<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { generateNewStyle, writeNewStyle } from './utils/theme.js'

const store = useStore()
const lang = store.getters.language
const locale = computed(() => lang === 'en' ? en : zhCn) 

generateNewStyle(store.getters.mainColor)
  .then((newStyle) => writeNewStyle(newStyle))

</script>
