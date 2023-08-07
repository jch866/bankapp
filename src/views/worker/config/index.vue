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
        <el-button @click="searchHandle">查询</el-button>
        <el-button type="primary" @click="addWorker">新增柜员</el-button>
      </el-col>
    </el-row>
  </div>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    header-cell-class-name="table-header-th"
    cell-class-name="allcell"
  >
    <el-table-column prop="date" label="柜员号" width="120" />
    <el-table-column prop="name" label="柜员姓名" width="120" />
    <el-table-column prop="name" label="柜员类型" />
    <el-table-column prop="name" label="机构号" />
    <el-table-column prop="address" label="机构名称" />
    <el-table-column prop="name" label="柜员状态" />
    <el-table-column prop="name" label="柜员来源" />
    <el-table-column label="操作" align="center" width="180">
      <template #default="scope">
        <div class="operate_btn">
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
        </div>

        <div class="operate_btn">
          <el-button
            size="small"
            @click="handleDelete(scope.$index, scope.row)"
          >
            角色设置
          </el-button>
          <el-button
            size="small"
            @click="handleDelete(scope.$index, scope.row)"
          >
            主岗设置
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    v-model="dialogFormVisible"
    :title="dialogTitle"
    :destroy-on-close="true"
  >
    <el-form :model="formData">
      <el-form-item label="柜员名称" :label-width="formLabelWidth">
        <el-input v-model="formData.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="柜员种类" :label-width="formLabelWidth">
        <el-select v-model="formData.region" placeholder="--请选择--">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from "vue";
const search = reactive<any>({});
const dialogFormVisible = ref<boolean>(false);
const dialogTitle = ref<string>("新增柜员");
const formData = reactive<any>({});
const formLabelWidth = "140px";
const Data = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove",
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
function addWorker() {
  dialogFormVisible.value = true;
}
function searchHandle() {}
</script>

<style scoped>
:deep(.cell) {
  text-align: center;
  padding: 0 4px;
}
.operate_btn {
  display: flex;
  justify-content: center;
  padding: 2px 0;
}
</style>
