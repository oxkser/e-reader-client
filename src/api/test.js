import request from '@/utils/request'
export function test2 () { // 测试
  return request({
    url: '/a',
    method: 'get'
  })
}
