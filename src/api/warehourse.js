import request from '@/utils/request'

/*
 * 库房管理模块
 */

// 根据单位和班组获取库房信息
export const getWareInfo = (typea) => {
  return request({
    url: '/warehourse/info',
    method: 'get',
    params: typea
  })
}

// 根据获取库房信息
export const getSingleWareInfo = (typea) => {
  return request({
    url: '/warehourse/singeleWareHourseInfo',
    method: 'get',
    params: typea
  })
}
// 根据获取库房信息
export const getFullWareInfo = (typea) => {
  return request({
    url: '/warehourse/fullInfo',
    method: 'get',
    params: typea
  })
}
// 更新库房
export const updateWareHourse = (data) => {
  return request({
    url: '/warehourse/update',
    method: 'put',
    data: data
  })
}
// 删除库房
export const deleteWareHourse = (id) => {
  return request({
    url: '/warehourse/' + id,
    method: 'delete'
  })
}
// 批量删除库房
export const deleteBatchWareHourse = (id) => {
  return request({
    url: '/warehourse/batch/del',
    method: 'post',
    data: id
  })
}
// 新增库房
export function addWareHourse(data) {
  return request({
    url: '/warehourse/save',
    method: 'post',
    data: data
  })
}
