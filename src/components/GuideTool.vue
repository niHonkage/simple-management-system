<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')" placement="bottom" >
      <div @click="onGuideClick" id="guide-start">
        <svg-icon class="icon" icon="guide"  />
      </div>
    </el-tooltip>
  </div>
</template>
  
<script setup>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import steps from '@/utils/steps.js'

// 初始化driver
let driver = null
const i18n = useI18n()
onMounted(() => {
  driver = new Driver({
    animate: false,
    allowClose: false,
    closeBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev')
  })
})

const onGuideClick = () => {
  driver.defineSteps(steps(i18n))
  driver.start()
}
</script>
  
<style lang="scss" scoped>
</style>
