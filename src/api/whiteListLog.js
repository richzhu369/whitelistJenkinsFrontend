import request from '@/utils/request'

export function fetchLogList() {
  return request({
    url: '/api/whitelistlog/list',
    method: 'get'
  })
}
