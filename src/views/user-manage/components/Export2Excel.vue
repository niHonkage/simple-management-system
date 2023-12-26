<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input :placeholder="$t('msg.excel.placeholder')" v-model="excelName" @keyup.enter="onConfirm"></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button @click="onConfirm" type="primary" :loading="loading">{{ $t('msg.excel.confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
  
<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useI18n } from "vue-i18n"
import { watchSwitchLang } from '@/utils/i18n.js'
import { getUserManageAllList } from '@/api/user-manage.js'
import { USER_RELATIONS } from './utils'
import { dayFilter } from '@/filters'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const i18n = useI18n()
let exceldefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')
excelName.value = exceldefaultName
watchSwitchLang(() => {
  exceldefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exceldefaultName
})

const emit = defineEmits(['update:modelValue'])

// 导出按钮事件
const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  const allUser = (await getUserManageAllList()).list
  // 动态导入工具包
  const excel = await import('@/utils/Export2Excel')
  const data = formatJson(USER_RELATIONS, allUser)
  excel.export_json_to_excel({
    // excel表头
    header: Object.keys(USER_RELATIONS),
    // excel数据
    data,
    // 文件名称
    filename: excelName.value || exceldefaultName
  })
  closed()
}
const formatJson = (headers, rows) => {
  // 三维数据转换二维的过程需要两层迭代
  // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      // 角色属性是数组需要特殊处理
      if (headers[key] === 'role') {
        const roles = item.role
        return JSON.stringify(roles.map(role => role.title))
      }
      if (headers[key] === 'openTime') {
        return dayFilter(item[headers[key]])
      }
      return item[headers[key]]
    })
  })
}

const closed = () => {
  loading.value = false
  emit('update:modelValue', false)
}
</script>
  
<style>
  
</style>
