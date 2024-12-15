import request from '@/utils/request'

export function opIP(data) {
  return request({
    url: '/api/ingress/whitelist',
    method: 'post',
    data
  })
}

export function getLog() {
  return request({
    url: '/api/ingress/whitelistLog',
    method: 'get'
  })
}
