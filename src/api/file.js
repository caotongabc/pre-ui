import request from '@/utils/request'
export const uploadpciture = (data) => {
  return request({
    url: '/file/upload',
    method: 'post',
    data: data
  })
}
export const uploadRequirePciture = (data) => {
  return request({
    url: '/file/uploadRequirePhoto',
    method: 'post',
    data: data
  })
}
export const uploadAvator = (data) => {
  return request({
    url: '/file/upload/avator',
    method: 'post',
    data: data
  })
}
