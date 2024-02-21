<template>
  <el-form :model="loginForm" class="login-container">
    <h3>系统登录</h3>
    <el-form-item>
      <el-input type="input" placeholder="请输入账号" v-model="loginForm.username">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" placeholder="请输入密码" v-model="loginForm.password">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getCurrentInstance, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

// import { getCurrentInstance, reactive } from 'vue-demi';
export default {
  setup() {
    const  loginForm = reactive({
      username: 'admin',
      password: 'admin'
    });
    const {proxy} = getCurrentInstance()
    const store = useStore()
    const router = useRouter()
    // console.log(proxy.$api)
    const login = async () => {
      const res = await proxy.$api.getMenu(loginForm);
      console.log(res);
      store.commit('setMenu', res.menu);
      store.commit('addMenu', router);
      store.commit('setToken', res.token);
      router.push({
        name: 'home',
      })
    }
    return {
      loginForm,
      login,
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  h3 {
    text-align: center;
    margin-bottom: 40px;
    color: #505450;
  }
  // 登录按钮位置确认-
  // /deep/.el-form-item__content {
  :deep(.el-form-item__content) {
    justify-content: right;
  }
}
</style>