import axios from 'axios'
import { Loading } from 'element-ui'

window.axios = axios

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: -1// 请求超时时间
})

let loadingInst = null

// request拦截器
service.interceptors.request.use(config => {
  config.headers.Authorization = window.localStorage.getItem('token')
  if (config.showLoading) {
    loadingInst = Loading.service({
      lock: true,
      text: '数据加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  } else {
    loadingInst = null
  }
  return config
})

// respone拦截器
service.interceptors.response.use(
  resp => {
    if (loadingInst) loadingInst.close()
    const data = resp.data
    if (resp.status !== 200) {
      return Promise.reject(data)
    } else {
      return resp.data
    }
  },
  error => {
    if (loadingInst) loadingInst.close()
    return Promise.reject(error)
  }
)

export default service
