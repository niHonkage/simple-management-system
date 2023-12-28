<template>
  <div class="">
    <el-card>
      <el-table 
        :data="allPermissionList" 
        border
        style="width: 100%;margin-bottom: 20px;"
        deafault-expand-all
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column :label="$t('msg.permission.name')" prop="permissionName" width="180"></el-table-column>
        <el-table-column :label="$t('msg.permission.mark')" prop="permissionMark" width="180"></el-table-column>
        <el-table-column :label="$t('msg.permission.desc')" prop="permissionDesc"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { permissionList } from '@/api/permissions.js'
import { watchSwitchLang } from '@/utils/i18n'

/**
 * 权限分级：
 * 1. 一级权限为页面权限
 *  permissionMark 对应 路由名称
 * 2. 二级权限为功能权限
 *  permissionMark 对应 功能权限表
 */
// 所有权限
const allPermissionList = ref([])
const getPermissionList = async () => {
  allPermissionList.value = await permissionList()
}
getPermissionList()

watchSwitchLang(getPermissionList)
</script>

<style lang="scss" scoped></style>
