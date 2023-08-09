<template>
  <div class="chartsview" ref="echarRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

const props = defineProps(["data"]);
let echarRef = ref();
onMounted(() => {
  console.log(props.data);
  let mychart = echarts.init(echarRef.value);
  let option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Email",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series",
        },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "Union Ads",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series",
        },
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "Video Ads",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series",
        },
        data: [150, 232, 201, 154, 190, 330, 410],
      },
    ],
  };
  //设置配置项
  mychart.setOption(option);
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
