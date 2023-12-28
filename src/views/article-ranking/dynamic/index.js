import { ref, watch } from 'vue'
import getDynamicData from './DynamicData'
import { watchSwitchLang } from '@/utils/i18n'

export const dynamicData = ref(getDynamicData())

// 监视语言变化
watchSwitchLang(() => {
  dynamicData.value = getDynamicData()
  // 初始化选择
  initSelect()
})

// 选择数据和初始化选择
export const selectDynamicData = ref([])
const initSelect = () => {
  selectDynamicData.value = dynamicData.value.map((item) => item.label)
}
initSelect()

export const tableColumns = ref([])
watch(
  () => selectDynamicData.value,
  (val) => {
    tableColumns.value = []
    const selectData = dynamicData.value.filter((item) => {
      return val.includes(item.label)
    })
    tableColumns.value.push(...selectData)
  },
  {
    immediate: true
  }
)
