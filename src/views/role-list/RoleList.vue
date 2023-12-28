<template>
  <div class="">
    <el-card>
      <el-table :data="allRoles" border style="width: 100%;" >
        <el-table-column :label="$t('msg.role.index')" type="index" width="120"></el-table-column>
        <el-table-column :label="$t('msg.role.name')" prop="title"></el-table-column>
        <el-table-column :label="$t('msg.role.desc')" prop="describe"></el-table-column>
        <el-table-column :label="$t('msg.role.action')" width="260">
          <el-button type="primary" size="mini" @click="openDialog(row)">{{ $t('msg.role.assignPermissions') }}</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
  <distribute-permission v-model="dialogVisible" :roleId="selectRoleId"></distribute-permission>
</template>

<script setup>
import { ref } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'
import { roleList } from '@/api/role'
import { DistributePermission } from './components/DistributePermission.vue'

const allRoles = ref([])
const getRoleList = async () => {
  allRoles.value = await roleList()
  console.log(allRoles.value)
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
</script>

<style lang="scss" scoped></style>
