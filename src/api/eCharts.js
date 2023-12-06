import request from '@/utils/request'

/*
 * 图表信息显示模块
 */

// 获取接单数据信息
export const getAcceptOrRecallInfo = (typea) => {
  return request({
    url: '/eCharts/acceptWorkInfo',
    method: 'get',
    params: typea
  })
}
// 获取接单数据信息
export const getAcceptOrRecallInfoForChart = (typea) => {
  return request({
    url: '/eCharts/acceptOrRecallInfo',
    method: 'get',
    params: typea
  })
}
// 获取作业管理人员的信息（需求制订，工单完成等信息）
export const getWorkManageInfoForChart = (typea) => {
  return request({
    url: '/eCharts/workManageInfoForChart',
    method: 'get',
    params: typea
  })
}
// 获取仓库内工具的信息
export const getEquipmentInfoInWareHourseForChart = (typea) => {
  return request({
    url: '/eCharts/equipmentInfoInWareHourse',
    method: 'get',
    params: typea
  })
}

// 获取作业管理人员的信息（需求制订数据，工单完成数量等信息）
export const getWorkManageInfoForIndex = (typea) => {
  return request({
    url: '/eCharts/workManageInfo',
    method: 'get',
    params: typea
  })
}
getEquipmentWarnInfoForIndex
// 获取仓库管理人员的信息（4个数据）
export const getEquipmentWarnInfoForIndex = (typea) => {
  return request({
    url: '/eCharts/equipmentWarnInfo',
    method: 'get',
    params: typea
  })
}

export const getWarnInfoForChart = (typea) => {
  return request({
    url: '/eCharts/equipmentWarnInfoForChart',
    method: 'get',
    params: typea
  })
}
