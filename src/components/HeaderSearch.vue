<script setup>
import { ref, computed, watch } from 'vue'
import { filterRouters } from '@/utils/routes'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { generateRoutes } from '@/utils/FuseData.js'
import { watchSwitchLang } from '@/utils/i18n.js'

// 控制search显示
const isShow = ref(false)

// el-select实例
const searchSelectRef = ref()
const onShowClick = () => {
  isShow.value = !isShow.value
  searchSelectRef.value.focus()
}

// search相关
const search = ref('')

// 检索数据池，也就是侧边栏提供的导航
const router = useRouter()
let searchPool = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateRoutes(filterRoutes)
})

// 搜索库相关
let fuse
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool, {
    // 是否按优先级排序
    shouldSort: true,
    // 最小匹配长度
    minMatchCharLength: 1,
    // 将被搜索的键列表。 支持嵌套路径、加权搜索、在字符串和对象数组中搜索
    // name: 搜索的键
    // weight: 对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}
initFuse(searchPool.value)

// 国际化处理
watchSwitchLang(
  () => {
    searchPool = computed(() => {
      const filterRoutes = filterRouters(router.getRoutes())
      return generateRoutes(filterRoutes)
    })
    initFuse(searchPool.value)
  }
)

// 搜索方法
const querySearch = (query) => {
  if (query !== '') {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}

// 搜索结果
const searchOptions = ref([])

// 选中回调
const onSelectChange = (value) => {
  router.push(value.path)
}

// 关闭 search 的处理事件
const onClose = () => {
  searchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
}
// 监听搜索框的状态，如果isShow = true 就给body添加一个点击关闭事件
watch(isShow, (value) => {
  if (value) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})
</script>
<template>
  <div :class="{ show: isShow }" class="header-search" >
    <div class="icon-wrapper" @click.stop="onShowClick">
      <svg-icon 
      class-name="search-icon"
      icon="search"
    />
    </div>
    <el-select
      ref="searchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      placeholder="Search"
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>
<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  .icon-wrapper{
    display: inline-block;
    width: fit-content;
    height: fit-content;
    vertical-align: middle;
  }
  :deep(.search-icon) {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
