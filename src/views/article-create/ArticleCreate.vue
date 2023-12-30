<template>
  <div class="article-create">
    <el-card>
      <el-input
        class="title-input"
        :placeholder="$t('msg.article.titlePlaceholder')"
        v-model="title"
        maxlength="20"
        clearable
      />
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <markdown-editor
            :title="title"
            @onSuccess="onSuccess"
            :detail="detail"
          ></markdown-editor>
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name="editor">
          <richtext-editor
            :title="title"
            @onSuccess="onSuccess"
            :detail="detail"
          ></richtext-editor>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MarkdownEditor from './components/MarkdownEditor.vue'
import RichtextEditor from './components/RichtextEditor.vue'
import { articleDetail } from '@/api/article'
import { useRoute } from 'vue-router'

const title = ref('')
const activeName = ref('markdown')

const onSuccess = () => {
  title.value = ''
}

// 处理编辑相关
const route = useRoute()
const articleId = route.params.id
const detail = ref({})
const getArticleData = async () => {
  detail.value = await articleDetail(articleId)
  title.value = detail.value.title
}
if (articleId) {
  getArticleData()
}
</script>

<style lang="scss" scoped>
.title-input {
  margin-bottom: 20px;
}
</style>
