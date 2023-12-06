import request from '@/utils/request'

/*
 * 线路管理模块
 */

// 获取单位下的变电站信息
export const getLineInfo = (data) => {
  return request({
    url: '/line',
    method: 'get',
    params: data
  })
}

