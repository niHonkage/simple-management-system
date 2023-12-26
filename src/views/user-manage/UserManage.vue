<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="primary" @click="$router.push('/user/import')">{{ i18n.t('msg.excel.importExcel') }}</el-button>
        <el-button type="success">{{ i18n.t('msg.excel.exportExcel') }}</el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column :label="$t('msg.excel.name')" prop="username"></el-table-column>
        <el-table-column :label="$t('msg.excel.mobile')" prop="mobile"></el-table-column>
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <!-- 接收 prop 的默认插槽，并解构 -->
          <template v-slot="{ row }">
            <el-image class="avatar" :src="row.avatar" :preview-src-list="[row.avatar]"></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="mini">{{ item.title }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="mini">{{ i18n.t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dayFilter(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.action')" fixed="right" width="260" >
          <template #default>
            <el-button type="primary" size="mini">{{ i18n.t('msg.excel.show') }}</el-button>
            <el-button type="info" size="mini">{{ i18n.t('msg.excel.showRole') }}</el-button>
            <el-button type="danger" size="mini">{{ i18n.t('msg.excel.remove') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getUserManageList } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { useI18n } from 'vue-i18n'

// 数据相关
const tableData = ref([])
const i18n = useI18n()
const total = ref(0)
const page = ref(1)
const size = ref(2)

// 获取数据的方法
const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}
getListData()

// 监听语言变化
watchSwitchLang(getListData)

// 分页
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData() 
}

const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  :deep(.avatar) {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  :deep(.el-tag) {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
