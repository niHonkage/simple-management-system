<script setup>
import { defineProps, computed } from 'vue'
import external from '@/utils/validate.js'
const props = defineProps({
  // icon图标
  icon: {
    type: String,
    required: true
  },
  // 图标类名
  className: {
    type: String,
    default: ''
  }
})
// 判断当前图标是否为外部图标
const isExternal = computed(() => external(props.icon))
// 外部图标样式
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))
// 内部图标
const iconName = computed(() => `#icon-${props.icon}`)
</script>
<template>
  <!-- 展示外部图标 -->
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon">

  </div>
  <!-- 展示内部图标 -->
  <svg v-else :class="className" class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName"/>
  </svg>
</template>
<style lang="scss" scoped>
.svg-icon{
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon{
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}

</style>
