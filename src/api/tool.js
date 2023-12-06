import request from '@/utils/request'

// 工具模块

export function fetchList(query) {
  return request({
    url: '/tools/page',
    method: 'get',
    params: query
  })
}
export function getSingleToolInfo(query) {
  return request({
    url: '/tools/toolInfoOne',
    method: 'get',
    params: query
  })
}
export function fetchWarnList(query) {
  return request({
    url: '/tools/page5',
    method: 'get',
    params: query
  })
}

// 更新工具
export const updateCourse = (data) => {
  return request({
    url: '/tools',
    method: 'put',
    data: data
  })
}
// 删除工具
export const deleteCourse = (id) => {
  return request({
    url: '/tools/' + id,
    method: 'delete'
  })
}
// 批量删除工具
export const deleteBatchCourse = (id) => {
  return request({
    url: '/tools/batch/del',
    method: 'post',
    data: id
  })
}
// 验证工具id是否存在
export const isExistToolId = (typea) => {
  return request({
    url: '/tools/isExist',
    method: 'get',
    params: typea
  })
}
// 新增工具
export function addCourse(data) {
  return request({
    url: '/tools',
    method: 'post',
    data: data
  })
}

// 设置工具
export function settingCourse(id) {
  return request({
    url: '/tools/setting/' + id,
    method: 'post'
  })
}

// 获取工具集合
export function getCourseList(data) {
  return request({
    url: '/tools/list',
    method: 'get'
  })
}

// 根据单位和班组获取车辆信息
export const getFreeToolInfo = (typea) => {
  return request({
    url: '/tools/freeToolInfo',
    method: 'get',
    params: typea
  })
}

