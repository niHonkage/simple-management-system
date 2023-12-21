<script setup>
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue'
import AppMain from './components/AppMain.vue'
import variables from '@/style/variables.module.scss'
</script>
<template>
  <div class="app-wrapper" :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']">
    <!-- 左侧menu -->
    <side-bar id="guide-sidebar" class="sidebar-container" :style="{backgroundColor: variables.menuBg}"></side-bar>
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部的 navbar -->
        <nav-bar></nav-bar>
      </div>
      <app-main></app-main>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '~@/style/mixin.scss';
@import '~@/style/variables.module.scss';

.app-wrapper{
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header{
  position: fixed;
  top: 0;
  right: 0;
  width: calc(100% - #{$sideBarWidth});
  z-index: 10;
}
.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
  transition: width #{sideBarDuration};
}
</style>
