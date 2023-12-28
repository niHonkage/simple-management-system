<template>
  <el-dialog
    :title="$nextTick('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-tree
      ref="treeRef"
      :data="allPermission"
      show-checkbox
      check-strictly
      node-key="id"
      default-expand-all
      :props="defaultProps"
    >
    </el-tree>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button @click="onConfirm" type="primary">{{ $t('msg.universal.confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
  
<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { rolePermission, distributePermission } from '@/api/role.js'
import { permissionList } from '@/api/permissions.js'
import { watchSwitchLang } from '@/utils/i18n.js'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

const defaultProps = {
  children: 'children',
  label: 'permissionName'
}

const props = defineProps({
  modelValue: {
    tyep: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})

// 获取数据
const allPermission = ref([])
const getPermissionList = async () => {
  allPermission.value = await permissionList()
}
getPermissionList()
watchSwitchLang(getPermissionList)

// 获取单个角色的权限数据
const treeRef = ref(null)
const getRolePermission = async () => {
  console.log(props.roleId)
  const checkedKeys = await rolePermission(props.roleId)
  treeRef.value.setCheckedKeys(checkedKeys)
}
watch(
  () => props.roleId,
  (val) => {
    if (val) getRolePermission()
  }
)

const emit = defineEmits(['update:modelValue'])

// 确定点击事件
const i18n = useI18n()
const onConfirm = async () => {
  await distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  closed()
}

const closed = () => {
  emit('update:modelValue', false)
}
</script>
  
<style>
  
</style>
