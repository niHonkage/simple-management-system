<template>
  <el-timeline>
    <el-timeline-item
      v-for="item in chapterData"
      :key="item.id"
      :timestamp="item.timestamp"
      placement="top"
      hollow="true"
      type="primary"
    >
      <el-card>
        <h4>{{ item.content }}</h4>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>
  
<script setup>
import { chapter } from '@/api/user.js'
import { watchSwitchLang } from '@/utils/i18n'
import { ref } from 'vue'

const chapterData = ref([])

const getChapterData = async () => {
  chapterData.value = await chapter()
}
getChapterData()

// 监听语言变化
watchSwitchLang(getChapterData)

</script>
  
<style>
  
</style>
