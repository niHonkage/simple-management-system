<template>
  <upload-excel :onSuccess="onSuccess"></upload-excel>
</template>

<script setup>
import UploadExcel from './components/UploadExcel.vue'
import { USER_RELATIONS, formatDate } from './utils/index.js'
import { userBatchImport } from '@/api/user-manage.js'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const generateData = (data) => {
  const arr = []
  data.forEach((obj) => {
    const userInfo = {}
    Object.keys(obj).forEach((key) => {
      // 针对日期的解析优化
      if (USER_RELATIONS[key] === 'openTime') {
        userInfo[USER_RELATIONS[key]] = formatDate(obj[key])
        return
      }
      // 中文替换英文
      userInfo[USER_RELATIONS[key]] = obj[key]
    })
    arr.push(userInfo)
  })
  return arr
}
const i18n = useI18n()
const router = useRouter()
const onSuccess = async ({ header, results }) => {
  const updateData = generateData(results)
  await userBatchImport(updateData)
  ElMessage.success({
    message: results.length + i18n.t('msg.excel.importSuccess'),
    type: 'success'
  })
  router.push('/user/manage')
}
</script>

<style lang="scss" scoped></style>
