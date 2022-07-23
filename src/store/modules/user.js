// 状态
import { getToken, removeToken, setToken } from '@/utils/auth'
import { login } from '@/api/user'

const state = {
  token: getToken()
}
// 修改状态
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  }
}
// 执行异步
const actions = {
  async login(context, data) {
    console.log(data)
    const res = await login(data)
    console.log(res)
    context.commit('setToken', res)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

