import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'

import './assets/less/index.less'
import store from './store/index.js'
import './api/mock.js'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import api from './api/api'

// 完整引用
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

const app = createApp(App)


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// app.use(ElementPlus)
app.config.globalProperties.$api = api
store.commit('addMenu', router);

// 校验访问路由是否存在
function checkRouter(path) {
  let hasCheck = router.getRoutes().filter(route => route.path == path).length
  if (hasCheck) {
    return true
  } else {
    return false
  }
  // 查看所有路由
  // console.log(router.getRoutes());
}

checkRouter()

// 实现未登录时跳转登录页面，登录路由不是login跳转到login
router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.token
  // 存在未登录可以访问home页面
  // if (!token && to.name !== 'login') {
  //   next({ name: 'login' })
  // } else if (!checkRouter(to.path)) {
  //   next({ name: 'home' })
  // } else {
  //   next()
  // }
  if (!token) {
    if (to.name !== 'login') {
      next({ name: 'login' }) // 如果未通过身份验证，请重定向到登录页面
    } else {
      next() // 如果是登录页面，请继续访问请求的页面
    }
  } else {
    if (!checkRouter(to.path)) {
      next({ name: 'home' }) // 如果未找到请求的页面，则重定向到主页
    } else {
      next() //继续到请求的经过身份验证的页面 
    }
  }
})
app.use(router).use(store)
app.mount('#app')
// createApp(App).mount('#app')
