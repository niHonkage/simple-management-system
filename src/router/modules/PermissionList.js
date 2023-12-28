import layout from '@/views/layout/LayoutPage.vue'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  name: 'permissionList',
  meta: { title: 'user', icon: 'personnel' },
  children: [
    {
      path: '/user/permission',
      component: () => import('@/views/permission-list/PermissionList.vue'),
      meta: {
        title: 'permissionList',
        icon: 'permission'
      }
    }
  ]
}
