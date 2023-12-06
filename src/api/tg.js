import request from '@/utils/request'

/*
 * 台区管理模块
 */

// 获取单位下的台区信息
export const getTgInfo = (data) => {
  return request({
    url: '/tg',
    method: 'get',
    params: data
  })
}

