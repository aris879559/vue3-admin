/**
 * 整个项目的api管理
 * 
 */ 

import request from "./request"
export default {
  // home组件  左侧表格数据获取
  getTableData(params) {
    return request({
      url: '/home/getTableData',
      method: 'get',
      data: params,
      // 单个接口的mock控制开关,会覆盖总配置的mock开关
      mock: true
    })
  },
  // home组件  右侧图表数据获取
  getCountData() {
    return request({
      url: '/home/getCountData',
      method: 'get',
      mock: false
    })
  },
  getChartData() {
    return request({
      url: '/home/getChartData',
      method: 'get',
      mock: false
    })
  },
  getUserData(params) {
    return request({
      url: '/user/getUser',
      method: 'get',
      // 不启用线上fastmock,使用本地mock，设为false【总开关为false】
      mock: false,
      data: params
      // data: {total: 0, page: 1,}
    })
  },
  addUser(params) {
    return request({
      url: '/user/addUser',
      method: 'post',
      mock: false,
      data: params
    })
  },
  editUser(params) {
    return request({
      url: '/user/editUser',
      method: 'post',
      mock: false,
      data: params
    })
  },
  delUser(params) {
    return request({
      url: '/user/delUser',
      method: 'post',
      mock: false,
      data: params
    })
  },
  // 根据用户的用户名不同，返回不一样的菜单列表
  getMenu(params) {
    return request({
      url: '/permission/getMenu',
      method: 'post',
      // 使用本地mock数据
      mock: false,
      data: params
    })
  },
}