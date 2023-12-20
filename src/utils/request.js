import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use((config) => {
  config.headers.icode = 'helloqianduanxunlianying'
  return config
})

service.interceptors.response.use(
  (response) => {
    // 2XX 范围内的状态码都会触发此回调函数
    // 返回的respons第一层data一般都包含 success, message, data
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      // 业务错误逻辑
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // 超出 2XX 范围的状态码都会在这里处理
    // TODO: 将来处理 token 超时问题
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
