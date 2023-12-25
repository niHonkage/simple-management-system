<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <project-card class="user-card" :features="featureData"></project-card>
      </el-col>
      <el-col :span="18">
        <el-tabs v-model="activeName">
          <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
            <feature-tab :features="featureData"></feature-tab>
          </el-tab-pane>
          <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
            <chapter-tab></chapter-tab>
          </el-tab-pane>
          <el-tab-pane :label="$t('msg.profile.author')" name="author">
            <author-tab></author-tab>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProjectCard from './components/ProjectCard.vue'
import AuthorTab from './components/AuthorTab.vue'
import ChapterTab from './components/ChapterTab.vue'
import FeatureTab from './components/FeatureTab.vue'
import { feature } from '@/api/user.js'
import { watchSwitchLang } from '@/utils/i18n'

const activeName = ref('feature')

// 获取feature数据
const featureData = ref(null)
const getFeatureData = async () => {
  featureData.value = await feature()
}
getFeatureData()

watchSwitchLang(getFeatureData)
</script>

<style lang="scss" scoped>
.my-container {
  .user-card {
    margin-right: 20px;
  }
}
</style>
