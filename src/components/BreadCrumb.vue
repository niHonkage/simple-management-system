<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref, watch } from 'vue'
import { generateTitle } from '@/utils/i18n'

const breadcrumbData = ref([])
const route = useRoute()
// route.matched 返回包含当前路由的所有嵌套路径片段的路由记录 
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter((item) => {
    return item.meta && item.meta.title 
  })
}

// 监听路由变化调用更新数据
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true
  }
)
// 处理点击事件
const router = useRouter()
const onLinkClick = (item) => {
  router.push(item.path)
}

// 将来需要主题更换，这里需要获取动态样式
const store = useStore()
const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>
<template>
  <el-breadcrumb class="breadcrumb" :separator-icon="ArrowRight">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="item.path">
        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">{{ generateTitle(item.meta.title) }}</span>
        <a v-else class="redirect" @click.prevent="onLinkClick(item)">{{ generateTitle(item.meta.title) }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<style lang="scss" scoped>
.breadcrumb{
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  
  ::v-deep no-redirect {
    color: #97a8be;
    cursor: text;
  }
  ::v-deep redirect {
    color: #666;
    font-weight: 600;
  }
  ::v-deep redirect:hover {
    color: v-bind(linkHoverColor);
  }
}
</style>
