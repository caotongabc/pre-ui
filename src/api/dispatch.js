import request from '@/utils/request'
// 新增需求派单信息
export function addRequireDispatchInfo(data) {
  return request({
    url: '/dispatch',
    method: 'post',
    data: data
  })
}
// 新增工作单派单信息
export function addOrderDispatchInfo(data) {
  return request({
    url: '/orderDispatch',
    method: 'post',
    data: data
  })
}

// 需求勘察接单
export function acceptDispath(requireId) {
  return request({
    url: '/dispatch/accept/' + requireId,
    method: 'delete'
  })
}
// 工作单接单
export function acceptOrderDispath(orderId) {
  return request({
    url: '/orderDispatch/accept/' + orderId,
    method: 'delete'
  })
}
// 退单
export function recallDispatch(data) {
  return request({
    url: '/dispatch/recall',
    method: 'post',
    data: data
  })
}
// 退单
export function recallOrderDispatch(data) {
  return request({
    url: '/orderDispatch/recall',
    method: 'post',
    data: data
  })
}
// 获取退单页面的信息
export const getRecallDispatchInfo = (typea) => {
  return request({
    url: '/dispatch/recallInfo',
    method: 'get',
    params: typea
  })
}
// 获取退单页面的信息
export const getRecallOrderDispatchInfo = (typea) => {
  return request({
    url: '/orderDispatch/recallInfo',
    method: 'get',
    params: typea
  })
}

// 获取详情页面需求的派单的信息（需求）
export const getDispatchInfoInDetails = (typea) => {
  return request({
    url: '/dispatch/dispatchInfo',
    method: 'get',
    params: typea
  })
}

// 获取详情页面的工作单派单的信息（工作单）
export const getOrderDispatchInfoInDetails = (typea) => {
  return request({
    url: '/orderDispatch/dispatchInfo',
    method: 'get',
    params: typea
  })
}
// 获取退单页面的信息
export const getAcceptDispatchInfo = (typea) => {
  return request({
    url: '/dispatch/acceptInfo',
    method: 'get',
    params: typea
  })
}
// 获取工作单派单的信息
export const getOrderAcceptDispatchInfo = (typea) => {
  return request({
    url: '/orderDispatch/acceptInfo',
    method: 'get',
    params: typea
  })
}
