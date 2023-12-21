import { login, getUserInfo } from '@/api/sys.js'
import { setItem, getItem, clearItem } from '@/utils/storage.js'
import { TOKEN } from '@/constant/index.js'
import router from '@/router/index.js'
import { setTimeStamp } from '@/utils/auth'
// 密码加密库
import md5 from 'md5'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      // 本地 和 vuex 双存储
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 登录请求
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username, password: md5(password) })
          .then((data) => {
            this.commit('user/setToken', data.token)
            setTimeStamp()
            router.push('/')
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    // 获取用户信息
    async getUserInfo(context) {
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      console.log(res)
      return res
    },
    logout(context) {
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', null)
      clearItem()
      // TODO:清理权限相关数据
      router.push('/login')
    }
  }
}
