<script setup>
import { Tools } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import ToggleButton from './ToggleButton.vue'
import BreadCrumb from '@/components/BreadCrumb.vue'

const store = useStore()
const logout = () => {
  store.dispatch('user/logout')
}
</script>
<template>
  <div class="navbar">
    <toggle-button class="hamburger-container" />
    <bread-crumb class="bread-crumb"></bread-crumb>
    <div class="right-menu">
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar shape="square" :size="40" :src="store.getters.userInfo.avatar"></el-avatar>
          <el-icon><Tools /></el-icon>
        </div>
        <template #dropdown>
            <router-link to="/">
              <el-dropdown-item>主页</el-dropdown-item>
            </router-link>
            <a target="_blank" href="#">
              <el-dropdown-item>课程主页</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .bread-crumb{
    float: left;
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    z-index: 10;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
