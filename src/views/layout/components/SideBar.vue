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

const logoHeight = 44
</script>
<template>
  <div class="side-bar">
    <div class="logo-container">
      <el-avatar
        :size="logoHeight"
        shape="square"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
      />
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">
       imooc-admin
      </h1>
    </div>
    <el-scroolbar>
      <!-- 一级 menu 菜单 -->
      <el-menu
      :background-color="$store.getters.cssVar.menuBg"
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
    </el-scroolbar>
  </div>
</template>
<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + 'px';
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
