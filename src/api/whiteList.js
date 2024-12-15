import request from '@/utils/request'

export function fetchAddIP(data) {
  return request({
    url: '/api/whitelist/add',
    method: 'post',
    data
  })
}

export function fetchDeleteIP(data) {
  return request({
    url: '/api/whitelist/delete',
    method: 'delete',
    data
  })
}
