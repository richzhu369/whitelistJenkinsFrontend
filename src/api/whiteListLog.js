import request from '@/utils/request'

export function fetchLogList(query) {
  return request({
    url: '/api/whitelistlog/list',
    method: 'get',
    params: query
  })
}
