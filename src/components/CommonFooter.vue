<template>
  <div class="common-footer">
    <p>Power by CTO</p>
  </div>
</template>

<script>
export default {
  name: 'CommonFooter',
  data() {
    return {
      year: new Date().getFullYear() // 获取当前年份
    };
  },
  computed: {
    formattedYear() {
      return this.year.toString().substr(-2); // 只取年份的后两位数字
    }
  }
  // 在这里可以添加组件的逻辑和方法
}
</script>

<style scoped>
.el-container {
  margin-bottom: -20px; /* 减小容器底部的外边距 */
}
.common-footer {
  position: fixed;
  bottom: 0;
  height: 60px;
  width: 100%;
  text-align: center;
  background-color: #f2f2f2;
  padding: 20px 0;
}
</style>
