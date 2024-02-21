<template>
  <el-header>
    <div class="l-content">
      <!-- 图标的展示 -->
      <el-button size="small" plain @click="handleCollapse">
        <el-icon :size="20">
          <Menu />
        </el-icon>
      </el-button>
      <!-- <h3>首页</h3> -->
      <el-breadcrumb separator="/" class="bread">
        <!-- 首页一定存在的所以直接写死 -->
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{current.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <!-- <img class="user" src="../assets/images/v-logo.png" alt="" /> -->
          <img class="user" :src="getImgSrc('user')" alt="" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script>
import { computed, defineComponent } from 'vue-demi';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup() {
    let store = useStore()
    // const imgSrc = require('../assets/images/v-logo.png')
    const getImgSrc = (user) => {
    // const getImgSrc = (imageName) => {
      console.log(import.meta.url);
      // console.log(new URL(`.../assets/images/${imageName}.png`, import.meta.url));
      return new URL(`../assets/images/${user}.png`, import.meta.url).href;
      // return new URL("../assets/images/v-logo.png", import.meta.url).href;
      // return new URL(`../assets/images/${imageName}`, import.meta.url).href;
    }
    let handleCollapse = () => {
      //调用vuex中的mutations
      store.commit('updateIsCollapse');
    }
    // 计算属性
    const current = computed(() => {
      return store.state.currentMenu;
    })
    const router = useRouter();
    const handleLogout = () => {
      store.commit('clearMenu');
      router.push({
        name: 'login',
      })
    };
    return {
      // imgSrc,
      getImgSrc,
      handleCollapse,
      current,
      handleLogout,
    }
  }
}
</script>
<style lang="less" scoped>
header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  width: 100%;
}
.r-content{
  .user{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.l-content{
  display: flex;
  align-items: center;
  .el-button{
    margin-right: 20px;
  }
  h3{
    color: #fff;
  }
}
// .bread /deep/ span{
//   color: #fff !important;
//   cursor: pointer !important;
// }

// 解决告警[@vue/compiler-sfc] the >>> and /deep/ combinators have been deprecated. Use :deep() instead.
:deep(.bread span){
  color: #fff !important;
  cursor: pointer !important;
}
</style>