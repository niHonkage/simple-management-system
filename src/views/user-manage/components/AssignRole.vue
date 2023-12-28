<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-checkbox-group v-model="userRoleTitleList">
      <el-checkbox v-for="item in allRoleList" :key="item.id" :label="item.title"></el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <span>
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button @click="onComfirm" type="primary">{{ $t('msg.universal.confirm') }}</el-button>
      </span>
    </template>
  </el-dialog> 
</template>
  
<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import { userRoles, updateRole } from '@/api/user-manage'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

// 获取全部角色数据
const allRoleList = ref([])
const getRoleList = async () => {
  allRoleList.value = await roleList()
}
getRoleList()
watchSwitchLang(getRoleList)

// 当前用户数据
const userRoleTitleList = ref([])
// 需要注意这里，组件初始化的时候用户尚未点击按钮传参
// 所以获取用户数据的操作应该在监听到userId时再进行
const getUserRoles = async () => {
  const res = await userRoles(props.userId)
  userRoleTitleList.value = res.role.map(item => item.title)
}
watch(
  () => props.userId,
  (val) => {
    if (val) getUserRoles()
  }
)

const emit = defineEmits(['update:modelValue', 'updateRole'])

// 确定点击
const i18n = useI18n()
const onComfirm = async () => {
  // 处理提交数据
  // 这里的处理是把数组转换成对应的数组嵌套对象
  const roles = userRoleTitleList.value.map(title => {
    return allRoleList.value.find(role => role.title === title)
  })
  await updateRole(props.userId, roles)
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  emit('updateRole')
  closed()
}

// 取消事件
const closed = () => {
  emit('update:modelValue', false)
}

</script>
  
<style>
  
</style>
