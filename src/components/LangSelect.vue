<script setup>
import { useI18n } from 'vue-i18n'
import { defineProps, computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function(value) {
      return ['dark', 'light'].indexOf(value) !== -1
    } 
  }
})

const store = useStore()
const language = computed(() => {
  return store.getters.language
})
const i18n = useI18n()
const handleSetLanguage = (lang) => {
  i18n.locale.value = lang
  store.commit('app/setLanguage', lang)
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>

<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <el-tooltip :content="$t(msg.navBar.lang)" :effect="effect">
        <svg-icon icon="language"/>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language = 'zh'" command="zh">
          中文
        </el-dropdown-item>
        <el-dropdown-item :disabled="language = 'en'" command="en">
          english
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
