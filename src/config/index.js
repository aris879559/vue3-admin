/**
 * 环境配置文件
 * 企业级项目有三个环境： 开发、测试和生产环境
 */ 

// 当前环境
const env = import.meta.env.MODE || 'prod' 

const EnvConfig = {
  development: {
    baseApi: '/api',
    // fastmock接口根地址
    mockApi: 'https://www.fastmock.site/mock/8f54bae301622744d0e273e4bd1270eb/api',
  },
  test: {
    baseApi: '//test.com/api',
    mockApi: 'https://www.fastmock.site/mock/8f54bae301622744d0e273e4bd1270eb/api',
  },
  prod: {
    baseApi: '//pro.com/api',
    mockApi: '/home/getDataxxx',
  },
}

export default {
  env,
  // mock总开关
  mock: false,
  ...EnvConfig[env]
}