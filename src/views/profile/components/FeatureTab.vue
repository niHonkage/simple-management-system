<template>
  <el-collapse v-model="activeName">
    <el-collapse-item 
      v-for="item in features"
      :key="item.id"
      :title="item.title"
      :name="item.id"
    >
      <div v-html="item.content"></div>
    </el-collapse-item>
  </el-collapse>
</template>
  
<script setup>
import { defineProps, ref } from 'vue'

defineProps({
  features: {
    type: Array,
    required: true
  }
})

const activeName = ref(0)
</script>
  
<style lang="scss" scoped>
:deep(.el-collapse-item_header) {
  font-weight: bold;
}
.el-collpse-item{
  :deep(a){
    color: #2d62f7;
    margin: 0 4px;
  }
}
</style>
