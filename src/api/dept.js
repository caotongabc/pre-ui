import request from '@/utils/request'

/*
 * 部门管理模块
 */

// 保存
export const saveDept = (data) => {
  return request({
    url: '/dept',
    method: 'post',
    data: data
  })
}
// 获取部门列表
export const getDept = () => {
  return request({
    url: '/dept',
    method: 'get'
  })
}
// 获取部门列表
export const getDeptInRegister = () => {
  return request({
    url: '/dept/inRegister',
    method: 'get'
  })
}
// 获取所属下级部门列表
export const getLowDept = (typea) => {
  return request({
    url: '/dept/childern',
    method: 'get',
    params: typea
  })
}
// 获取部门列表(非树结构)
export const getDeptArray = () => {
  return request({
    url: '/dept/a',
    method: 'get'
  })
}
// 获取部门树
export const getDeptTree = () => {
  return request({
    url: '/dept/tree',
    method: 'get'
  })
}

// 更新部门
export const updateDept = (data) => {
  return request({
    url: '/dept',
    method: 'put',
    data: data
  })
}
// 删除部门
export const deleteDept = (id) => {
  return request({
    url: '/dept/' + id,
    method: 'delete'
  })
}
