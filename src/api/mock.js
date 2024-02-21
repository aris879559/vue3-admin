import Mock from 'mockjs'
import homeApi from './mockData/home'
import userApi from './mockData/user'
import permissionApi from './mockData/permission'
// 拦截请求
Mock.mock('/home/getData', homeApi.getHomeData)

// 本地获取user的数据, 采用正则的方式拦截,注意接口最后必须指定/
Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/user\/addUser/, 'post', userApi.createUser)
Mock.mock(/user\/editUser/, 'post', userApi.updateUser)
Mock.mock(/user\/delUser/, 'post', userApi.deleteUser)
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)