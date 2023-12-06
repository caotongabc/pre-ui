import request from '@/utils/request'

// 车辆模块

export function fetchCarList(query) {
  return request({
    url: '/car/page',
    method: 'get',
    params: query
  })
}

export function fetchCarOne(query) {
  return request({
    url: '/car/carInfo',
    method: 'get',
    params: query
  })
}
// 获取相应的试验信息
export function fetchCarWarnList(query) {
  return request({
    url: '/car/page5',
    method: 'get',
    params: query
  })
}
// 获取保险信息
export function fetchCarWarnInsuranceList(query) {
  return request({
    url: '/car/page6',
    method: 'get',
    params: query
  })
}

// 更新车辆
export const updateCar = (data) => {
  return request({
    url: '/car',
    method: 'put',
    data: data
  })
}
// 删除车辆
export const deleteCar = (id) => {
  return request({
    url: '/car/' + id,
    method: 'delete'
  })
}
// 批量删除车辆
export const deleteBatchCar = (id) => {
  return request({
    url: '/car/batch/del',
    method: 'post',
    data: id
  })
}
// 验证车辆id是否存在
export const isExistCarNumber = (typea) => {
  return request({
    url: '/car/isExist',
    method: 'get',
    params: typea
  })
}
// 新增车辆
export function addCar(data) {
  return request({
    url: '/car',
    method: 'post',
    data: data
  })
}

// 设置车辆
export function settingCar(id) {
  return request({
    url: '/car/setting/' + id,
    method: 'post'
  })
}

// 获取车辆集合
export function getCarList(data) {
  return request({
    url: '/car/list',
    method: 'get'
  })
}
// 根据单位和班组获取车辆信息
export const getFreeCarInfo = (typea) => {
  return request({
    url: '/car/freeCarInfo',
    method: 'get',
    params: typea
  })
}
