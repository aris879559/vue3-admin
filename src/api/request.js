import axios  from "axios";
import config from "../config";
import { ElMessage } from 'element-plus';

const NETWORK_ERROR = '网络异常，请稍后重试！';
// 创建一个axios实例对象
const service = axios.create({
  baseURL: config.baseApi, // 设置请求的基础URL
})
// 在请求之前准备工作
service.interceptors.request.use((req) => {
  // 自定义header
  // jwt-token 认证
  return req;
})

// 请求之后处理事情
service.interceptors.response.use((res) => {
  // console.log(res);
  const { code, data, msg } = res.data
  // 根据后端协商状态码而定
  if (code == 200) {
    return data
  } else {
    // 网络请求错误
    console.error('请求失败:', msg);
    ElMessage.error(msg || NETWORK_ERROR)
    return Promise.reject(msg || NETWORK_ERROR)
    // return Promise.reject(new Error(msg || NETWORK_ERROR))
  }
})

// 封装的核心函数
function request(options) {
  options.method = options.method || 'get';
  if(options.method.toLowerCase() === 'get') {
    options.params = options.data;
    // delete options.data; // 当为GET请求时，应删除data节点
  }
  // 对mock的处理，若自定义mock为true则为true，定义false为false
  let isMock = config.mock
  if(typeof options.mock !== 'undefined') {
    isMock = options.mock
  }
  // 对线上环境进行处理
  if(config.env === 'prod') {
    // 线上环境不用mock数据
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }
  return service(options)
}

export default request