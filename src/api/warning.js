import request from '@/utils/request'
// 新增工具试验信息
export function addToolWarnInfo(data) {
  return request({
    url: '/warning/tool',
    method: 'post',
    data: data
  })
}
// 新增车辆试验信息
export function addCarWarnTestInfo(data) {
  return request({
    url: '/warning/car/test',
    method: 'post',
    data: data
  })
}
// 新增车辆试验信息
export function addCarWarnInsuranceInfo(data) {
  return request({
    url: '/warning/car/insurance',
    method: 'post',
    data: data
  })
}
// 查看工具的试验信息
export function getToolDetailWarnInfo(query) {
  return request({
    url: '/warning/toolDetail',
    method: 'get',
    params: query
  })
}
// 查看车辆的试验信息
export function getCarDetailTestWarnInfo(query) {
  return request({
    url: '/warning/carDetail/test',
    method: 'get',
    params: query
  })
}
// 查看车辆的保险信息
export function getCarDetailInsuranceWarnInfo(query) {
  return request({
    url: '/warning/carDetail/insurance',
    method: 'get',
    params: query
  })
}

