/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const userList = {
  path: '/userList',
  component: Layout,
  redirect: '/table/complex-table',
  name: '用户管理',
  meta: {
    title: '用户管理',
    icon: 'user',
    roles: ['admin']
  },
  children: [
    {
      path: 'usermanagement',
      component: () => import('@/views/table/user-list.vue'),
      name: '用户管理',
      meta: { title: '用户管理', roles: ['admin'] }
    }
  ]
}
export default userList
