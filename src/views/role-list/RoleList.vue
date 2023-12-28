<template>
  <div class="role-list-container">
    <el-card>
      <el-table :data="allRoles" border style="width: 100%">
        <el-table-column
          :label="$t('msg.role.index')"
          type="index"
          width="120"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.name')"
          prop="title"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.desc')"
          prop="describe"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.action')"
          width="260"
          #default="{ row }"
        >
          <el-button
            type="primary"
            size="small"
            @click="openDialog(row)"
            v-permission="['distributePermission']"
            >{{ $t('msg.role.assignPermissions') }}</el-button
          >
        </el-table-column>
      </el-table>
    </el-card>
    <distribute-permission
      v-model="dialogVisible"
      :roleId="selectRoleId"
    ></distribute-permission>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'
import { roleList } from '@/api/role'
import DistributePermission from './components/DistributePermission.vue'

const allRoles = ref([])
const getRoleList = async () => {
  allRoles.value = await roleList()
}
getRoleList()

watchSwitchLang(getRoleList)

// 弹窗相关
const dialogVisible = ref(false)
const selectRoleId = ref('')
const openDialog = (row) => {
  dialogVisible.value = true
  selectRoleId.value = row.id
}
watch(
  () => dialogVisible.value,
  (val) => {
    if (!val) selectRoleId.value = ''
  }
)
</script>

<style lang="scss" scoped></style>
