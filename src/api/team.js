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
// 获取单位下的班组信息
export const getTeamByUnit = (data) => {
  return request({
    url: '/team',
    method: 'get',
    params: data
  })
}

