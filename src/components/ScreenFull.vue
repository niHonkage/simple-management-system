<script setup>
import { ref } from 'vue'
import screenfull from 'screenfull'

// 是否全屏
const isFullScreen = ref(false)

// 触发事件
const onToggle = () => {
  isFullScreen.value = !isFullScreen.value
  screenfull.toggle()
}

</script>
<template>
  <div @click="onToggle" id="guide-full">
    <svg-icon 
    :icon="isFullScreen ? 'exit-fullscreen' : 'fullscreen'"
    ></svg-icon>
  </div>
</template>
<style lang="scss" scoped>

</style>
