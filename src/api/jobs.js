import request from './request'

export function getJobsApi(params) { return request.get('/jobs',{params}) }
export function createJobApi(data) { return request.post('/jobs', data) }
export function updateJobApi(id, data) { return request.put(`/jobs/${id}`, data) }
export function deleteJobApi(id) { return request.delete(`/jobs/${id}`) }