/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const userSelfReset = {
  path: '/userSelfReset',
  component: Layout,
  redirect: '/table/complex-table',
  name: '密码修改',
  meta: {
    title: '密码修改',
    icon: 'user'
  },
  children: [
    {
      path: 'userSelfReset',
      component: () => import('@/views/table/userSelfReset.vue'),
      name: '密码修改',
      meta: { title: '密码修改' }
    }
  ]
}
export default userSelfReset
