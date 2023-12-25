<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { filterRouters, generateMenus } from '@/utils/routes'
import SidebarItem from './SidebarItem.vue'

const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})

const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
}) 
</script>
<template>
  <el-menu
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :unique-opened="true"
    :default-active="activeMenu"
    :router="true"
    :collapse="!$store.getters.sidebarOpened"
    >
      <!-- 子集 menu 菜单 -->
      <sidebar-item
        v-for="item in routes"
        :key="item.path"
        :route="item"
      ></sidebar-item>
    </el-menu>
</template>
