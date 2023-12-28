import store from '@/store'

const checkPermission = (el, binding) => {
  // 指令钩子函数传入的binding对象的value属性
  const { value } = binding
  // 获取所有功能指令
  const points = store.getters.userInfo.permission.points
  // 传入的参数必须是数组
  if (value && value instanceof Array) {
    const hasPermission = points.some((point) => {
      return value.includes(point)
    })
    // 没有权限的话就删除按钮
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('v-permission value should be Array')
  }
}

export default {
  // 在绑定元素的父组件被挂载后使用
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  // 在包含组件的VNode及其组件的VNode更新后调用
  update(el, binding) {
    checkPermission(el, binding)
  }
}
