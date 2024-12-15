/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const whiteList = {
  path: '/whitelist',
  component: Layout,
  redirect: '/table/complex-table',
  name: '白名单',
  meta: {
    title: '白名单',
    icon: 'el-icon-s-claim'
  },
  children: [
    {
      path: '/br',
      component: () => import('@/views/table/addIP.vue'),
      name: 'br',
      meta: { title: '巴西' }
    },
    {
      path: '/vn',
      component: () => import('@/views/table/addIP.vue'),
      name: 'br',
      meta: { title: '越南' }
    },
    {
      path: '/pk',
      component: () => import('@/views/table/addIP.vue'),
      name: 'pk',
      meta: { title: '巴基斯坦' }
    },
    {
      path: '/ph',
      component: () => import('@/views/table/addIP.vue'),
      name: 'ph',
      meta: { title: '菲律宾' }
    }
  ]
}
export default whiteList
