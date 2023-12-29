<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectDynamicData">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :key="index"
            :label="item.label"
          ></el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card>
      <el-table ref="tableRef" :data="tableData" border>
        <el-table-column
          v-for="(item, index) in tableColumns"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        >
          <template #default="{ row }" v-if="item.prop === 'publicDate'">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
          <template #default="{ row }" v-else-if="item.prop === 'action'">
            <el-button @click="onShowClick(row)" type="primary" size="small">
              {{ $t('msg.article.show') }}
            </el-button>
            <el-button @click="onRemoveClick(row)" type="danger" size="small">
              {{ $t('msg.article.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated, onMounted } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'
import { getArticleList, articleSort, deleteArticle } from '@/api/article'
import { dynamicData, tableColumns, selectDynamicData } from './dynamic'
import Sortable from 'sortablejs'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(10)

// 获取数据的方法
const getListData = async () => {
  const res = await getArticleList({
    page: page.value,
    size: size.value
  })
  tableData.value = res.list
  total.value = res.total
}
getListData()
watchSwitchLang(getListData)
// 处理数据不会重新加载的问题（tab切换不会销毁keep-alive组件）
onActivated(getListData)

// 表格拖拽相关
const tableRef = ref(null)
const i18n = useI18n()
const initSorable = () => {
  // 获取拖拽元素
  const el = tableRef.value.$el.querySelectorAll(
    '.el-table__inner-wrapper .el-table__body-wrapper .el-table__body tbody'
  )[0]
  // 配置对象
  Sortable.create(el, {
    ghostClass: 'sortable-ghost',
    async onEnd(event) {
      // 时间中结构出拖拽前后的index变化
      const { newIndex, oldIndex } = event
      // 根据接口要求传入参数
      await articleSort({
        initRanking: tableData.value[newIndex].ranking,
        finalRanking: tableData.value[oldIndex].ranking
      })
      ElMessage.success(i18n.t('msg.article.sortSuccess'))

      // 完成上传数据再重新拉取新数据
      tableData.value = []
      getListData()
    }
  })
}
onMounted(() => {
  initSorable()
})

// 删除文章
const onRemoveClick = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.article.dialogTitle1') +
      row.title +
      i18n.t('msg.article.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteArticle(row._id)
    ElMessage.success(i18n.t('msg.article.removeSuccess'))
    getListData()
  })
}

// 查看详情
const router = useRouter()
const onShowClick = (row) => {
  router.push(`/article/${row._id}`)
}

// 处理分页
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}

const handleCurrentPage = (currentPage) => {
  page.value = currentPage
  getListData()
}
</script>

<style lang="scss" scoped>
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  :deep(.el-table__row) {
    cursor: pointer;
  }
  :deep(.sortable-ghost) {
    opacity: 0.6;
    color: #fff !important;
    background: #304156 !important;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
