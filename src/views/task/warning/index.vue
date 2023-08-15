<template>
  <div class="search_box" ref="aaa">
    <el-row>
      <el-col :span="6">
        <el-form-item label="机构类型">
          <el-select
            v-model="search.org_type"
            placeholder="--请选择--"
            clearable
          >
            <el-option
              v-for="(value, key) in orgTypeMap"
              :key="key"
              :label="value"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="节点名称">
          <el-select
            v-model="search.stepname"
            placeholder="--请选择--"
            clearable
          >
            <el-option
              v-for="(value, key) in stepNameMap"
              :key="key"
              :label="value"
              :value="value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="流程类型">
          <el-select
            v-model="search.flow_type"
            placeholder="--请选择--"
            clearable
          >
            <el-option
              v-for="(value, key) in flowTypeMap"
              :key="key"
              :label="value"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-button @click="searchHandle">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-col>
    </el-row>
  </div>
  <div class="echarts_box">
    <EchartsView :data="echarts_data" />
  </div>
  <el-table
    :data="tableData"
    style="width: 100%"
    header-cell-class-name="table-header-th"
  >
    <el-table-column type="index" label="" width="50" align="center" />
    <el-table-column prop="stepname" label="节点名称" width="180" />
    <el-table-column label="红色预警" align="center">
      <el-table-column prop="red_sum" label="笔数(明细)" width="120" />
      <el-table-column prop="red_personal" label="个人待处理" width="120" />
      <el-table-column prop="red_public" label="公共待处理" width="120" />
    </el-table-column>
    <el-table-column label="黄色预警" align="center">
      <el-table-column prop="yellow_sum" label="笔数(明细)" width="120" />
      <el-table-column prop="yellow_personal" label="个人待处理" width="120" />
      <el-table-column prop="yellow_public" label="公共待处理" width="120" />
    </el-table-column>
    <el-table-column label="正常节点" align="center">
      <el-table-column prop="normal_sum" label="笔数(明细)" width="120" />
      <el-table-column prop="normal_personal" label="个人待处理" width="120" />
      <el-table-column prop="normal_public" label="公共待处理" width="120" />
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref, onBeforeUnmount } from "vue";
import EchartsView from "./echartsView.vue";
import { ElMessage } from "element-plus";
import { getTaskList } from "@/api/task";
import { datamap, clearEmptyPro } from "@/utils/util";
const search = reactive<any>({});
let tableData = ref([]);
let echarts_data = ref([]);
let seconds = 10000;
let timer: any = null;
const { orgTypeMap, stepNameMap, flowTypeMap } = datamap;
async function getData() {
  let newsearch = clearEmptyPro(search);
  if (Object.entries(newsearch).length > 0 && timer) {
    clearInterval(timer);
  }
  const res = await getTaskList(newsearch);
  if (res.code === 200) {
    tableData.value = res.data;
    echarts_data.value = res.data;
  } else {
    ElMessage({
      message: "请求失败",
      type: "error",
    });
  }
}
onMounted(() => {
  getData();
  timer = setInterval(() => {
    getData();
  }, seconds);
});
function searchHandle() {
  clearInterval(timer);
  getData();
}
function reset() {
  search.stepname = "";
  search.org_type = "";
  search.flow_type = "";
  getData();
  timer = setInterval(() => {
    getData();
  }, seconds);
}
onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style scoped>
:deep(.cell) {
  text-align: center;
  padding: 0 4px;
}
</style>
