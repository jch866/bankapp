<template>
  <div class="search_box">
    <el-row>
      <el-col :span="6">
        <el-form-item label="机构类型">
          <el-select v-model="search.region" placeholder="--请选择--">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="节点名称">
          <el-select v-model="search.node" placeholder="--请选择--">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
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
  <div class="echarts_box"></div>
  <el-table
    :data="tableData"
    style="width: 100%"
    header-cell-class-name="table-header-th"
  >
    <el-table-column type="index" label="" width="50" align="center" />
    <el-table-column prop="date" label="节点名称" width="180" />
    <el-table-column label="红色预警" align="center">
      <el-table-column prop="state" label="笔数(明细)" width="120" />
      <el-table-column prop="city" label="个人待处理" width="120" />
      <el-table-column prop="state" label="公共待处理" width="120" />
    </el-table-column>
    <el-table-column label="黄色预警" align="center">
      <el-table-column prop="state" label="笔数(明细)" width="120" />
      <el-table-column prop="city" label="个人待处理" width="120" />
      <el-table-column prop="state" label="公共待处理" width="120" />
    </el-table-column>
    <el-table-column label="正常节点" align="center">
      <el-table-column prop="state" label="笔数(明细)" width="120" />
      <el-table-column prop="city" label="个人待处理" width="120" />
      <el-table-column prop="state" label="公共待处理" width="120" />
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import * as echarts from "echarts";
console.log(echarts);
// interface Isearch{
//   flow?:'',
//   node?:'',
//   region?:''
// }
const search = reactive<any>({});
let tableData = reactive<any>([]);

function getData() {
  console.log("getData warning");
}
onMounted(() => {
  getData();
});
function searchHandle() {}
tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189",
  },
];
</script>

<style scoped>
:deep(.cell) {
  text-align: center;
  padding: 0 4px;
}
</style>
