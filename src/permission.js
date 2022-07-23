// 处理权限判断
import store from '@/store' // 拿到 store 仓库
import router from '@/router' // 拿到路由
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const loginPath = '/login'
const NotFoundPath = '/404'
const wihteList = [loginPath, NotFoundPath] // 设置通行的白名单地址

// 前置守卫  to>>目标路由 from>>当前路由  next >>带你用形式据欸的那个最终去哪个路由
router.beforeEach((to, from, next) => {
  // 判断是否有token
  if (store.getters.token) {
    NProgress.start() // 开启进度条
    // 判断是否在 登录页面
    if (to.path === loginPath) {
      // 去首页
      next('/')
    } else {
      next()
    }
  } else {
    // 判断白名单地址是否包含你在的地方
    if (wihteList.includes(to.path)) {
      next()
    } else {
      next(loginPath)
    }
  }
  NProgress.done() // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
})
// 后置守卫
router.afterEach(function() {
  NProgress.done() // 关闭进度条
})
