import request from '@/utils/request'

/*
 * 不停电需求管理模块
 */

// 根据查询条件获取需求信息并分页显示
export const getWorkRequireInfoByPage = (typea) => {
  return request({
    url: '/workRequire/page',
    method: 'get',
    params: typea
  })
}
// 详情页面显示需求信息
export const getOneWorkRequireInfo = (typea) => {
  return request({
    url: '/workRequire/requireInfoOne',
    method: 'get',
    params: typea
  })
}

// 根据需求id进行相应的需求信息
export const getWorkRequireInfoByRequireId = (typea) => {
  return request({
    url: '/workRequire/infoOne',
    method: 'get',
    params: typea
  })
}
// 获取工人的需求信息
export const getWorkerRequireInfoByPage = (typea) => {
  return request({
    url: '/workRequire/work/page',
    method: 'get',
    params: typea
  })
}
// 批量的提交
export const submitList = (id) => {
  return request({
    url: '/workRequire/submitList',
    method: 'post',
    data: id
  })
}
// 批量的撤回
export const recallList = (id) => {
  return request({
    url: '/workRequire/recallList',
    method: 'post',
    data: id
  })
}
// 新增需求
export function addWorkRequire(data) {
  return request({
    url: '/workRequire',
    method: 'post',
    data: data
  })
}
// 新增回复信息
export function addFeedBackInfo(data) {
  return request({
    url: '/requireHandle',
    method: 'post',
    data: data
  })
}

// 修改回复信息（复勘操作）
export function updateFeedBackInfo(data) {
  return request({
    url: '/requireHandle/watchAgain',
    method: 'put',
    data: data
  })
}
// 获取回复的信息
export const getHandleInfoOne = (typea) => {
  return request({
    url: '/requireHandle/Info',
    method: 'get',
    params: typea
  })
}
// 新增回复信息
export function takeEquipment(data) {
  return request({
    url: '/orderHandle/takeEquipment',
    method: 'post',
    data: data
  })
}
// 更新需求
export const updateWorkRequire = (data) => {
  return request({
    url: '/workRequire',
    method: 'put',
    data: data
  })
}
// 审核需求
export const auditWorkRequire = (data) => {
  return request({
    url: '/workRequire/audit',
    method: 'put',
    data: data
  })
}

// 删除需求信息
export const deleteWorkRequire = (id) => {
  return request({
    url: '/workRequire/' + id,
    method: 'delete'
  })
}
