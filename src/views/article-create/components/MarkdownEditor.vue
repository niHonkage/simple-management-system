<template>
  <div class="markdown-container">
    <div id="markdown-box"></div>
    <div class="bottom">
      <el-button @click="onSubmitClick()" type="priamry" :loading="loading">{{
        $t('msg.article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits, watch } from 'vue'
import { useStore } from 'vuex'
import MkEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { watchSwitchLang } from '@/utils/i18n'
import { commitArticle, editArticle } from './commit.js'

// 初始化实例
let el
let mkEditor
onMounted(() => {
  el = document.getElementById('markdown-box')
  initEditor()
})

// 初始化配置对象
const store = useStore()
const initEditor = () => {
  // 具体配置
  mkEditor = new MkEditor({
    el,
    previewStyle: 'vertical',
    height: '500px',
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
  })
  // 渲染方法
  mkEditor.getMarkdown()
}

// 监听语言变化重新渲染
watchSwitchLang(() => {
  if (!el) return
  // 保存用户已输入的内容
  const htmlStr = mkEditor.getHTML()
  mkEditor.destroy()
  initEditor()
  mkEditor.setHTML(htmlStr)
})

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: Object
  }
})

// 提交事件
const loading = ref(false)
const emits = defineEmits(['onsuccess'])
const onSubmitClick = async () => {
  loading.value = true
  // 编辑事件 或 新建事件
  if (props.detail && props.detail.content) {
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: mkEditor.getHTML()
    })
  } else {
    await commitArticle({
      title: props.title,
      content: mkEditor.getHTML()
    })
  }
  mkEditor.reset()
  loading.value = false
  emits('onSuccess')
}

// 监听是否是编辑行为
watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      mkEditor.setHTML(val.content)
    }
  },
  {
    immediate: true
  }
)
</script>

<style scoped lang="scss">
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
