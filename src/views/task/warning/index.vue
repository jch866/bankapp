<template>
  <div class="search_box" ref="aaa">
    <el-row>
      <el-col :span="6">
        <!-- todo 机构类型 表格中没展示 -->
        <el-form-item label="机构类型">
          <el-select v-model="search.org" placeholder="--请选择--">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="节点名称">
          <el-select v-model="search.stepname" placeholder="--请选择--">
            <el-option label="Zone one" value="碎片录入" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <!-- todo 流程类型 表格中没展示 -->
        <el-form-item label="流程类型">
          <el-select v-model="search.flow" placeholder="--请选择--">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-button @click="searchHandle">查询</el-button>
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
import { reactive, onMounted } from "vue";
import EchartsView from "./echartsView.vue";
import { ElMessage } from "element-plus";
import { getTaskList } from "@/api/task";
const search = reactive<any>({});
let tableData = reactive<any>([]);
let echarts_data = reactive<any>([]);

async function getData() {
  // let obj = {a:1} // 搜索时用 todo
  const res = await getTaskList(search);
  if (res.code === 200) {
    tableData.push(...res.data);
    echarts_data.push(...res.data);
  } else {
    ElMessage({
      message: "请求失败",
      type: "error",
    });
  }
}
onMounted(() => {
  getData();
});
function searchHandle() {
  getData();
}
</script>

<style scoped>
:deep(.cell) {
  text-align: center;
  padding: 0 4px;
}
</style>
