import request from '@/utils/request'

/*
 * 库房管理模块
 */

// 根据获取预警策略信息并分页
export const getFullWarnStrategyInfo = (typea) => {
  return request({
    url: '/warnStrategy/fullInfo',
    method: 'get',
    params: typea
  })
}
// 根据获取预警策略信息（用于计算下次试验时间）
export const getOneWarnStrategyInfo = (typea) => {
  return request({
    url: '/warnStrategy/oneInfo',
    method: 'get',
    params: typea
  })
}
// 更新预警策略信息
export const updateWarnStratery = (data) => {
  return request({
    url: '/warnStrategy/update',
    method: 'put',
    data: data
  })
}
// 删除预警策略信息
export const deleteWarnStratery = (id) => {
  return request({
    url: '/warnStrategy/' + id,
    method: 'delete'
  })
}
// 批量删除预警策略信息
export const deleteBatchWarnStratery = (id) => {
  return request({
    url: '/warnStrategy/batch/del',
    method: 'post',
    data: id
  })
}

// 发布策略
export const updateState = (id) => {
  return request({
    url: '/warnStrategy/updateState',
    method: 'post',
    data: id
  })
}
// 取消发布策略
export const updateState2 = (id) => {
  return request({
    url: '/warnStrategy/updateState2',
    method: 'post',
    data: id
  })
}

// 新增策略
export function addWarnStratery(data) {
  return request({
    url: '/warnStrategy/save',
    method: 'post',
    data: data
  })
}
