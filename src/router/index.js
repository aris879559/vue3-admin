import { createRouter,createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component:()=>import('../views/Main.vue'),
    name: 'home1',
    redirect:'/home',
    // children:[
    //   {
    //     path: '/home', // 默认子路由，即打开应用时显示的页面
    //     name: 'home', // 路由名称，用于在路由跳转时指定目标路由
    //     component: () => import('../views/home/Home.vue')
    //   },
    //   {
    //     path: '/user',
    //     name: 'user',
    //     component: () => import('../views/user/User.vue')
    //   },
    //   {
    //     path: '/page1',
    //     name: 'page1',
    //     component: () => import('../views/Page1.vue')
    //   },
    //   {
    //     path: '/page2',
    //     name: 'page2',
    //     component: () => import('../views/Page2.vue')
    //   },
    // ],
    children: []
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router