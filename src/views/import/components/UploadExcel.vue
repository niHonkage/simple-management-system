<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button type="primary" :loading="loading" @click="handleUpload">{{ $t('msg.uploadExcel.upload') }}</el-button>
    </div>
    <input 
      ref="excelUploadInput"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleChange"
    >
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <el-icon size="60"><DocumentAdd /></el-icon>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>
  
<script setup>
import { ref, defineProps } from 'vue'
import { DocumentAdd } from '@element-plus/icons-vue'
import { getHeaderRow } from '@/utils/getHeaderRow.js'
import XLSX from 'xlsx'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  beforeUpload: Function,
  onSuccess: Function
})

// 点击上传
const loading = ref(false)
const excelUploadInput = ref(null)
const handleUpload = () => {
  excelUploadInput.value.click()
}
const handleChange = (e) => {
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) return
  upload(rawFile)
}

// 拖入触发
const isExcel = (file) => {
  return /\.(xlsx|xls|csv)$/.test(file.name)
}
const i18n = useI18n()
// 拖拽释放
const handleDrop = (e) => {
  if (loading.value) return
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error(i18n.t('msg.dialog.limitation'))
    return
  }
  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    ElMessage.error(i18n.t('msg.dialog.format'))
    return
  }
  // 触发上传事件
  upload(rawFile)
}
// 拖拽悬停
const handleDragover = (e) => {
  // https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/dropEffect
  // 在新位置生成源项的副本
  e.dataTransfer.dropEffect = 'copy'
}

// 触发上传事件
const upload = (file) => {
  excelUploadInput.value = null
  // 如果没有上传前的回调就可以直接读取
  if (!props.beforeUpload) {
    readerData(file)
    return
  }
  // 有上传前的回调就先执行回调，执行结果返回true再读数据
  const result = props.beforeUpload(file)
  if (result) {
    readerData(file)
  }
}

// 读取数据
const readerData = async (file) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
    const reader = new FileReader()
    // 该事件在读取操作完成时触发
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/onload
    reader.onload = e => {
      // 1. 获取解析到的数据
      const data = e.target.result
      // 2. 利用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3. 获取第一张表格(工作簿)名称
      const firstSheetName = workbook.SheetNames[0]
      // 4. 只读取 Sheet1（第一张表格）的数据
      const worksheet = workbook.Sheets[firstSheetName]
      // 5. 解析数据表头
      const header = getHeaderRow(worksheet)
      // 6. 解析数据体
      const results = XLSX.utils.sheet_to_json(worksheet)
      // 7. 传入解析之后的数据
      generateData({ header, results })
      // 8. loading 处理
      loading.value = false
      // 9. 异步完成
      resolve()
    }
    reader.readAsArrayBuffer(file)
  })
}

// 根据导入的内容生成数据
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}

</script>
  
<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    :deep(.el-icon) {
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
