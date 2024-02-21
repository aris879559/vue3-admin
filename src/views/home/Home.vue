<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 10px">
      <el-card shadow="hover">
        <div class="user">
          <img src="../../assets/images/v-logo.png" alt="" />
          <div class="user-info">
            <p class="name">Admin</p>
            <p class="role">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2024-1-29</span></p>
          <p>上次登录地点：<span>上海</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="margin-top: 20px" height="450px">
        <el-table stripe  style="width: 100%" max-height="240" :data="tableData">
          <el-table-column
            v-for="(val,key) in tabelLabel"
            :key="key"
            :prop="key"
            :label="val">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 10px;">
      <div class="num">
        <el-card 
        :body-style="{ display: 'flex',padding: 0 }"
        v-for="item in countData"
        :key="item.name">
          <component class="icons" :is="item.icon" :style="{ background: item.color }"></component>
          <div class="details">
            <p class="num">￥{{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 180px;">
        <div ref="echart" style="height: 190px;display: flex; justify-content: center; align-items: center;"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 170px;">
          <div ref="userechart" style="height: 180px;display: flex; justify-content: center; align-items: center;"></div>
        </el-card>
        <el-card style="height: 170px;">
          <div ref="videoechart" style="height: 180px;top: -29px;display: flex;justify-content: center;align-items: center;"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  import { defineComponent, onMounted, ref, getCurrentInstance, getCurrentScope, reactive } from 'vue'
  import axios from 'axios'
  import * as echarts from 'echarts'
  export default defineComponent({
    setup() {
      const { proxy } = getCurrentInstance();
      // 数据的双向绑定
      let tableData = ref([]);
      let countData = ref([]);
      const tabelLabel = {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      }
      const getTableList = async () => {
        // // await axios.get("/home/getData").then((res) =>{
        // //   console.log(res.data.data);
        // //   // 本地mock
        // //   tableData.value = res.data.data.tableData;

        // await axios
        //   .get("https://www.fastmock.site/mock/8f54bae301622744d0e273e4bd1270eb/api/home/getTableData")
        //   .then((res) =>{
        //     console.log(res);
        //     // 线上mock
        //     if (res.data.code === 0) {
        //       tableData.value = res.data.data;
        //     }
        // });

        // 二次封装axios
        try {
          let res = await proxy.$api.getTableData()
          // console.log('获取的表格数据:',res);
          tableData.value = res
        } catch (error) {
          // console.error('获取表格数据失败:', error);
        }
      }
      // 获取首页count数据
      const getCountData = async () => {
        let res = await proxy.$api.getCountData();
        // console.log('获取的count数据:',res);
        countData.value = res;
      }
      onMounted(() => {
        getTableList();
        // 获取count数据
        getCountData();
        // 获取echarts表格数据
        getChartData();
      });
      // 关于echarts表格的渲染部分
      let xOptions = reactive({
        // 图例文字颜色
        textStyle: {
          color: "#333",
        },
        grid: {
          left: "20%",
          top: '6%',
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          // data: userData.map(item => item.date),
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
        series: [],
      })
      let pieOptions = reactive({
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [],
      })
      let orderData = reactive({
        xData: [],
        series: [],
      })
      let userData = reactive({
        xData: [],
        series: [],
      })
      let videoData = reactive({
        series: [],
      })

      // 获取数据
      const getChartData = async () => {
        let result = await proxy.$api.getChartData();
        console.log(result);
        let res = result.orderData;
        let userRes = result.userData;
        let videoRes = result.videoData;
        orderData.xData = res.date;
        const keyArray = Object.keys(res.data[0]);
        const series = [];
        // console.log(res);
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: res.data.map((item) => item[key]),
            type: "line",
          });
        });
        orderData.series = series;
        xOptions.xAxis.data = orderData.xData;
        xOptions.series = orderData.series;
        // userData 进行渲染
        let hEcharts = echarts.init(proxy.$refs['echart']);
        hEcharts.setOption(xOptions);

        // 柱状图进行渲染的过程
        userData.xData = userRes.map((item) => item.date);
        userData.series = [
          {
            name: "新增用户",
            data: userRes.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: userRes.map((item) => item.active),
            type: "bar",
          },
        ];
        xOptions.xAxis.data = userData.xData;
        xOptions.series = userData.series;
        let uEcharts = echarts.init(proxy.$refs['userechart']);
        uEcharts.setOption(xOptions);

        // 饼状图
        videoData.series = [
          {
            data: videoRes,
            type: "pie",
          } 
        ];
        pieOptions.series = videoData.series;
        let vEcharts = echarts.init(proxy.$refs['videoechart']);
        vEcharts.setOption(pieOptions);
      };

      return {
        tableData,
        tabelLabel,
        countData,
      }
    },
  });
</script>
<style lang="less" scoped>
.home {
  .user{
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    img{
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin-right: 40px;
    }
  }
  .login-info {
    p{
      line-height: 30px;
      font-size: 14px;
      color: #999;
      span{
        color: #666;
        margin-left: 60px;
      }
    }
  }
  .num{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card{
      width: 32%;
      margin-bottom: 20px;
    }
  }
  .icons{
    width: 60px;
    height: 60px;
    // 设置卡片中间的图标大小
    padding: 6px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .details{
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // margin-top: 10px;
    .num{
      font-size: 30px;
      margin-bottom: 10px;
    }
    .txt{
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
  .graph{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    .el-card{
      width: 49%;
    }
  }
}

</style>