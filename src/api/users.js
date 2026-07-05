import request from './request'

export function loginApi(username, password) {
  return request.get('/users', { params: { username, password } })
}

export function updateUserApi(id, data) {
  return request.put(`/users/${id}`, data)
}