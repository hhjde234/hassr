import axios from 'axios'
import { Message } from 'element-ui'

const request = axios.create({
  // 如果执行 npm run dev  值为 /api 正确  /api 这个代理只是给开发环境配置的代理
  // 如果执行 npm run build 值为 /prod-api  没关系  运维应该在上线的时候 给你配置上 /prod-api的代理
  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础的基础地址
  timeout: 5000 // 定义5秒超时
})

// 请求拦截器
request.interceptors.response.use(response => {
  const { data: { data, success, message }} = response
  if (success) {
    return data
  }
  Message.error(message || '系统错误')
  return Promise.reject(message || '系统错误')
})

// 响应拦截器
request.interceptors.request.use()

export default request // 默认导出requesr 请求
