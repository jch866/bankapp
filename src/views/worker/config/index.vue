<template>
  <div class="search_box">
    <el-row>
      <el-col :span="6">
        <el-form-item label="柜员号">
          <el-select v-model="search.region" placeholder="--请选择--">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="机构号">
          <el-select v-model="search.node" placeholder="--请选择--">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6">
        <el-button size="small" @click="getData">查询</el-button>
        <el-button size="small" @click="getData">新增柜员</el-button>
      </el-col>
    </el-row>
  </div>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="date" label="柜员号" width="180" />
    <el-table-column prop="name" label="柜员姓名" width="120" />
    <el-table-column prop="name" label="柜员类型" />
    <el-table-column prop="name" label="机构号" />
    <el-table-column prop="address" label="机构名称" />
    <el-table-column prop="name" label="柜员状态" />
    <el-table-column prop="name" label="柜员来源" />
    <el-table-column label="操作" align="center" width="200">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          维护柜员
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >
          删除柜员
        </el-button>
        <el-button size="small" @click="handleDelete(scope.$index, scope.row)">
          角色设置
        </el-button>
        <el-button size="small" @click="handleDelete(scope.$index, scope.row)">
          主岗设置
        </el-button>
      </template>
    </el-table-column>
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

function handleEdit(index: number, row: any) {
  console.log(index);
  console.log(row);
}
function handleDelete(index: number, row: any) {
  console.log(index);
  console.log(row);
}
function getData() {
  console.log("getData config");
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
