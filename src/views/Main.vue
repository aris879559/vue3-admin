import router from '../router';
<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <Common-aside />
      <el-container>
        <Common-header />
        <Common-tab />
        <el-main class="right-main">
          <router-view />
        </el-main>
        <!-- footer必须放在此处 -->
        <Common-footer />
        <!-- <el-footer class="custom-footer">power by CTO</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import CommonHeader from '../components/CommonHeader.vue';
import CommonAside from '../components/CommonAside.vue';
import CommonFooter from '../components/CommonFooter.vue';
import CommonTab from '../components/CommonTab.vue';
export default defineComponent({
  components: {
    CommonHeader,
    CommonAside,
    CommonFooter,
    CommonTab,
  }
});
</script>
<style scoped lang="less">
.el-container {
  flex-wrap: wrap;
  align-items: flex-start;
  height: 100%;
}
.el-main {
  // 解决footer遮挡内容的问题，以及与导航栏的白屏区域
  padding-bottom: 80px; /* 页脚的高度，确保内容不会被遮挡 */
  box-sizing: border-box; /* 保持元素宽度不变 */
  position: relative; /* 加上相对定位 */
  z-index: 1; /* 确保内容在页脚之上 */
  min-height: calc(100vh - 60px); /* 计算页面高度，确保页脚位于页面底部 */
}
.common-layout {
  height: 100%;
  // 设置卡片太长出现两页
  .lay-container{
    flex-wrap: nowrap;
    .right-main{
      height: calc(100% - 60px) !important; /* 减去页脚的高度 */
    }
  }
  & > .el-container{
    height: 100%;
    & > .el-aside {
      height: 100%;
      border-right: none;
      background-color: #545c64;
    }
  }
}
// .custom-footer {
//   // 始终保持在用户视图的底部位置,元素将相对于浏览器窗口固定位置进行定位
//   position: fixed;
//   bottom: 0;
//   height: 60px;
//   width: 100%;
//   text-align: center;
//   background-color: #f2f2f2;
//   padding: 20px 0;
//   // align-items: flex-end;
// }
</style>