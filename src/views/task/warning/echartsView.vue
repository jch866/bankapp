<template>
  <div v-if="flag" class="chartsview" ref="echarRef"></div>
  <div
    v-if="!flag"
    class="chartsview"
    style="text-align: center; color: #909399"
  >
    暂无数据
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from "vue";
import * as echarts from "echarts";

const props = defineProps(["data"]);
let echarRef = ref();
let flag = ref(true);
let mychart: any = null;
const initChart = (data: any) => {
  if (mychart) {
    mychart.dispose();
  }
  console.log(data);
  const emphasisStyle = {
    itemStyle: {
      shadowBlur: 10,
      shadowColor: "rgba(0,0,0,0.3)",
    },
  };
  const xAxisData = data.map((item: any) => item.stepname);
  mychart = echarts.init(echarRef.value);
  let option = {
    color: ["red", "yellow"],
    tooltip: {
      formatter: "{b}<br /> {a}: {c}",
    },
    legend: {
      data: ["红色预警", "黄色预警"],
      left: "10%",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        axisLine: { onZero: true },
        splitLine: { show: false },
        splitArea: { show: false },
        data: [...xAxisData],
      },
    ],
    yAxis: {},
    series: [
      {
        name: "红色预警",
        type: "bar",
        stack: "one",
        emphasis: emphasisStyle,
        data: [...data.map((item: any) => item.red_sum)],
      },
      {
        name: "黄色预警",
        type: "bar",
        stack: "one",
        emphasis: emphasisStyle,
        data: [...data.map((item: any) => item.yellow_sum)],
      },
    ],
  };
  //设置配置项
  mychart.setOption(option);
};
onMounted(() => {
  watch(
    () => props.data,
    () => {
      if (props.data.length > 0) {
        // debugger;
        flag.value = true;
        nextTick(() => {
          initChart(props.data);
        });
      } else {
        flag.value = false;
      }
    },
  );
});
</script>
<script lang="ts">
export default {
  name: "EchartsView",
};
</script>
<style scoped>
.chartsview {
  width: 100%;
  min-height: 200px;
}
</style>
