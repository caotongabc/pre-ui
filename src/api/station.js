import request from '@/utils/request'

/*
 * 变电站管理模块
 */

// 获取单位下的变电站信息
export const getStationInfo = (data) => {
  return request({
    url: '/station',
    method: 'get',
    params: data
  })
}

