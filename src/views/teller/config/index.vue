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
        <el-button type="primary" @click="addTeller">新增柜员</el-button>
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
    <el-table-column prop="teller_no" label="柜员号" width="120" />
    <el-table-column prop="teller_name" label="柜员姓名" width="120" />
    <el-table-column prop="teller_type_me" label="柜员类型" />
    <el-table-column prop="org_number" label="机构号" />
    <el-table-column prop="org_name" label="机构名称" />
    <el-table-column prop="teller_status" label="柜员状态" />
    <el-table-column prop="teller_source_me" label="柜员来源" />
    <el-table-column label="操作" align="center" width="180">
      <template #default="scope">
        <div class="operate_btn">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            维护柜员
          </el-button>
          <el-popconfirm
            :title="`确定要删除${scope.row.teller_no}柜员吗?`"
            icon="Delete"
            @confirm="handleDelete(scope.$index, scope.row)"
          >
            <template #reference>
              <el-button size="small" type="danger">删除柜员</el-button>
            </template>
          </el-popconfirm>
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
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="柜员号" :label-width="formLabelWidth">
            <el-input v-model="formData.teller_no" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="柜员名称" :label-width="formLabelWidth">
            <el-input v-model="formData.teller_name" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="柜员电话" :label-width="formLabelWidth">
            <el-input v-model="formData.telephone" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="formData.mobile" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="英文名称" :label-width="formLabelWidth">
            <el-input v-model="formData.en_name" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="formData.sex" placeholder="--请选择--">
              <el-option label="男" :value="1" />
              <el-option label="女" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="柜员级别" :label-width="formLabelWidth">
            <el-input v-model="formData.teller_level" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="机构号" :label-width="formLabelWidth">
            <el-input v-model="formData.org_number" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="柜员状态" :label-width="formLabelWidth">
            <el-select
              v-model="formData.teller_status"
              placeholder="--请选择--"
            >
              <el-option label="Zone No.1" value="shanghai" />
              <el-option label="Zone No.2" value="beijing" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="柜员类型" :label-width="formLabelWidth">
            <el-select
              v-model="formData.teller_type_me"
              placeholder="--请选择--"
            >
              <el-option label="Zone No.1" value="shanghai" />
              <el-option label="Zone No.2" value="beijing" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input
              v-model="formData.remark"
              :rows="2"
              type="textarea"
              placeholder="Please input"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工作日期" :label-width="formLabelWidth">
            <el-date-picker
              v-model="formData.workdate"
              type="datetime"
              placeholder="请选择日期"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
      </el-row>
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
import { getTellerList } from "@/api/teller";
import { ElMessage } from "element-plus";
const search = reactive<any>({});
const dialogFormVisible = ref<boolean>(false);
const dialogTitle = ref<string>("新增柜员");
const formData = reactive<any>({});
const formLabelWidth = "100px";
let tableData = ref<any>([]);
function handleEdit(index: number, row: any) {
  console.log(index);
  // console.log(row);
  dialogTitle.value = "编辑柜员";
  dialogFormVisible.value = true;
  Object.assign(formData, row);
  console.log(formData);
}
function handleDelete(index: number, row: any) {
  console.log(index);
  console.log(row);
  getData();
}
function getData() {
  getTellerList().then((res) => {
    if (res.code === 200) {
      tableData.value = res.data;
    } else {
      ElMessage({
        message: "请求失败",
        type: "error",
      });
    }
  });
  console.log("getData config");
}
onMounted(() => {
  getData();
});
function addTeller() {
  dialogFormVisible.value = true;
  Object.assign(formData, {});
  // getData();
}
// function updateTeller() {
//   dialogFormVisible.value = true;
//  Object.assign(formData,row)
//  留在当前页？
// }
function searchHandle() {
  getData();
}
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
