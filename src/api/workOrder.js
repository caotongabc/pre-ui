import request from '@/utils/request'

/*
 * 不停电需求管理模块
 */

// 根据查询条件获取需求信息并分页显示
export const getWorkOrderInfoByPage = (typea) => {
  return request({
    url: '/workOrder/page',
    method: 'get',
    params: typea
  })
}
// 详情页面显示工作单信息
export const getOneWorkOrderInfo = (typea) => {
  return request({
    url: '/workOrder/orderInfoOne',
    method: 'get',
    params: typea
  })
}
// 详情页面显示工作单信息
export const getOrderCarInfo = (typea) => {
  return request({
    url: '/orderHandle/orderCarInfo',
    method: 'get',
    params: typea
  })
}
// 详情页面显示工作单信息
export const getOrderToolInfo = (typea) => {
  return request({
    url: '/orderHandle/orderToolInfo',
    method: 'get',
    params: typea
  })
}

// 根据需求id进行相应的需求信息
export const getWorkRequireInfoByRequireId = (typea) => {
  return request({
    url: '/workOrder/infoOne',
    method: 'get',
    params: typea
  })
}
// 获取工人的工作单信息
export const getWorkerOrderInfoByPage = (typea) => {
  return request({
    url: '/workOrder/worker/page',
    method: 'get',
    params: typea
  })
}
// 新增需求
export function addWorkRequire(data) {
  return request({
    url: '/workOrder',
    method: 'post',
    data: data
  })
}
// 新增回复信息
export function addFeedBackInfo(data) {
  return request({
    url: '/workOrder',
    method: 'post',
    data: data
  })
}
// 修改工作单信息（返工操作）
export function updateOrderWorkAgainHandleInfo(data) {
  return request({
    url: '/orderHandle/workAgain',
    method: 'put',
    data: data
  })
}
// 获取工作单处理的信息
export const getOrderHandleInfoOne = (typea) => {
  return request({
    url: '/orderHandle/Info',
    method: 'get',
    params: typea
  })
}
// 到达现场操作
export const updateOrderArriveHandleInfo = (data) => {
  return request({
    url: '/orderHandle/arrive',
    method: 'put',
    data: data
  })
}
// 开始工作操作
export const updateOrderStartWorkHandleInfo = (data) => {
  return request({
    url: '/orderHandle/startWork',
    method: 'put',
    data: data
  })
}
// 完工操作
export const updateOrderFinishWorkHandleInfo = (data) => {
  return request({
    url: '/orderHandle/finishWork',
    method: 'put',
    data: data
  })
}
// 审核需求
export const auditWorkOrder = (data) => {
  return request({
    url: '/workOrder/audit',
    method: 'put',
    data: data
  })
}
