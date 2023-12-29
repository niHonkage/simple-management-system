<template>
  <div class="editor-container">
    <div id="editor-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick" :loading="loading">{{
        $t('msg.article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineEmits, defineProps, ref, watch } from 'vue'
import E from 'wangeditor'
// 国际化支持
import i18next from 'i18next'
import { useStore } from 'vuex'
import { commitArticle, editArticle } from './commit.js'

// editor实例
let editor
let el
onMounted(() => {
  el = document.getElementById('editor-box')
  initEditor()
})

const store = useStore()
const initEditor = () => {
  editor = new E(el)
  editor.config.zIndex = 1
  // 菜单栏提示
  editor.config.showMenuToolTips = true
  editor.config.menuTooltipPosition = 'down'
  // 国际化
  editor.config.lang = store.getters.language === 'zh' ? 'zn-CN' : 'en'
  editor.i18next = i18next
  editor.create()
}

const emits = defineEmits(['onSuccess'])
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: Object
  }
})
const loading = ref(false)
watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      editor.txt.html(val.content)
    }
  },
  {
    immediate: true
  }
)
const onSubmitClick = async () => {
  loading.value = true

  if (props.detail && props.detail.content) {
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: editor.txt.html()
    })
  } else {
    await commitArticle({
      title: props.title,
      content: editor.txt.html()
    })
  }
  editor.txt.html('')
  emits('onSuccess')
}
</script>

<style lang="scss" scoped>
.editor-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
