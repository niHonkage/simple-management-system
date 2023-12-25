import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store/index.js'
import { isCheckTimeout } from './auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    config.headers.icode = 'helloqianduanxunlianying'
    if (store.getters.token) {
      if (isCheckTimeout()) {
        // 退出操作
        console.log('退出')
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 失效'))
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // 接口国际化
    config.headers['Accept-Language'] = store.getters.language

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

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
    // token过期 要满足三个条件
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('user/logout')
    }
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
