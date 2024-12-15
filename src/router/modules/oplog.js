/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const opLog = {
  path: '/oplog',
  component: Layout,
  redirect: '/table/complex-table',
  name: '操作日志',
  meta: {
    title: '操作日志',
    icon: 'list'
  },
  children: [
    {
      path: '/list',
      component: () => import('@/views/table/oplog.vue'),
      name: 'oplog',
      meta: { title: '操作日志' }
    }
  ]
}
export default opLog
