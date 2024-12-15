import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}

export function createUser(data) {
  return request({
    url: '/api/user/create',
    method: 'post',
    data
  })
}

export function resetUser(data) {
  return request({
    url: '/api/user/reset',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/api/user/delete',
    method: 'delete',
    data
  })
}

export function fetchUserList(token) {
  return request({
    url: '/api/user/list',
    method: 'get',
    params: { token }
  })
}
