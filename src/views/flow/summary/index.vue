<template>
  <div class="search_box">
    <el-row>
      <el-col :span="6">
        <el-form-item label="起始日期">
          <el-select v-model="search.region" placeholder="--请选择--">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="终止日期">
          <el-select v-model="search.node" placeholder="--请选择--">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="起始时间">
          <el-select v-model="search.region" placeholder="--请选择--">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="终止时间">
          <el-select v-model="search.node" placeholder="--请选择--">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="机构类型">
          <el-select v-model="search.node" placeholder="--请选择--">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="机构号/名称">
          <el-select v-model="search.region" placeholder="--请选择--">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="交易码/名称">
          <el-select v-model="search.node" placeholder="--请选择--">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="流程状态">
          <el-select v-model="search.node" placeholder="--请选择--">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="发起柜员号">
          <el-input v-model="search.name" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="前端流水号">
          <el-input v-model="search.name" />
        </el-form-item>
      </el-col>
      <el-col :span="6"></el-col>

      <el-col :span="6">
        <el-button size="small" @click="getData">查询</el-button>
      </el-col>
    </el-row>
  </div>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column type="index" width="50" />
    <el-table-column prop="date" label="交易发起时间" width="180" />
    <el-table-column prop="name" label="流程结束日期" width="180" />
    <el-table-column prop="name" label="前端流水号" />
    <el-table-column prop="name" label="交易码" />
    <el-table-column prop="address" label="交易名称" />
    <el-table-column prop="name" label="汇划渠道" />
    <el-table-column prop="name" label="交易金额" />
    <el-table-column prop="name" label="流程状态" />
    <el-table-column prop="name" label="发起机构号" />
    <el-table-column prop="name" label="发起机构名称" />
    <el-table-column prop="name" label="发起柜员号" />
    <el-table-column prop="name" label="发起柜员名称" />
  </el-table>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from "vue";
const search = reactive<any>({});
const Data = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
let tableData = reactive<any>(Data);

function getData() {
  console.log("getData summary");
}
onMounted(() => {
  getData();
});
</script>

<style scoped>
:deep(.cell) {
  text-align: center;
}
</style>
