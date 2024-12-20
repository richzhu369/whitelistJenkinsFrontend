import request from '@/utils/request'

export function fetchLogList(query) {
  return request({
    url: '/api/whitelistlog/list',
    method: 'get',
    params: query
  })
}

export function fetchFilter(query) {
  return request({
    url: '/api/whitelistlog/filter',
    method: 'get',
    params: query
  })
}
