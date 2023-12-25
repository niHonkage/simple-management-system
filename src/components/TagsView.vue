<template>
  <div class="tags-container">
     <router-link
      class="tags-view-item"
      v-for="(tag, index) in $store.getters.tagsViewList"
      :key="tag.fullPath"
      :class="isActive(tag) ? 'active' : ''"
      :to="{ path: tag.fullPath }"
      :style="{
        backgroundColor: isActive(tag) ? $store.getters.cssVar.menuBg : '',
        borderColor: isActive(tag) ? $store.getters.cssVar.menuBg : ''
      }"
      @contextmenu.prevent="openMenu($event, index)"
     >
      {{ tag.title }}
      <el-icon class="el-icon-close" v-show="!isActive(tag)" @click.prevent="onClose(index)" size="16">
        <Close />
      </el-icon>
    </router-link>
    <context-menu 
      v-show="isVisible"
      :style="menuPos"
      :index="selectIndex"
    ></context-menu>
  </div>
</template>
  
<script setup>
import { ref, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Close } from '@element-plus/icons-vue'
import ContextMenu from './ContextMenu.vue'
import { useStore } from 'vuex'

const route = useRoute()
const isActive = (tag) => {
  return tag.path === route.path
} 

// 关闭tag
const store = useStore()
const onClose = (index) => {
  store.commit('app/removeTagsView', {
    type: 'index',
    index: index
  })
}

// 控制右键菜单的打开
const isVisible = ref(false)
const menuPos = reactive({
  left: 0,
  top: 0
})
const selectIndex = ref(0)
const openMenu = (e, index) => {
  const { x, y } = e
  menuPos.left = x + 'px'
  menuPos.top = y + 'px'
  selectIndex.value = index
  isVisible.value = true
}

// 关闭弹窗
const closeMenu = () => {
  isVisible.value = false
}

watch(
  isVisible,
  (value) => {
    if (value) {
      document.body.addEventListener('click', closeMenu)
    } else {
      document.body.removeEventListener('click', closeMenu)
    }
  }
)
</script>
  
<style lang="scss" scoped>
.tags-container{
  height: 34px;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item{
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background-color: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type{
      margin-left: 15px;
    }
    &:last-of-type{
      margin-right: 15px;
    }
    &.active{
      color: #fff;
      &::before{
        content: '';
        position: relative;
        right: 3px;
        background-color: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 4px;
      }
    }
    // close按钮
    :deep(.el-icon-close){
      display: inline-block;
      line-height: 10px;
      vertical-align: -3px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before{
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover{
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
