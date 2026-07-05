import request from './request'

export function getJobsApi() { return request.get('/jobs') }
export function createJobApi(data) { return request.post('/jobs', data) }
export function updateJobApi(id, data) { return request.put(`/jobs/${id}`, data) }
export function deleteJobApi(id) { return request.delete(`/jobs/${id}`) }