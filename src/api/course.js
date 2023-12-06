import request from '@/utils/request'

// 租户模块

export function fetchList(query) {
  return request({
    url: '/course/page',
    method: 'get',
    params: query
  })
}

// 更新租户
export const updateCourse = (data) => {
  return request({
    url: '/course',
    method: 'put',
    data: data
  })
}
// 删除租户
export const deleteCourse = (id) => {
  return request({
    url: '/course/' + id,
    method: 'delete'
  })
}

// 新增用户
export function addCourse(data) {
  return request({
    url: '/course',
    method: 'post',
    data: data
  })
}

// 设置租户
export function settingCourse(id) {
  return request({
    url: '/course/setting/' + id,
    method: 'post'
  })
}

// 获取租户集合
export function getCourseList(data) {
  return request({
    url: '/course/list',
    method: 'get'
  })
}
