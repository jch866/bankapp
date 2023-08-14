<template>
  <div class="search_box">
    <el-row>
      <el-col :span="6">
        <el-form-item label="柜员号">
          <el-select
            v-model="search.teller_no"
            placeholder="--请选择--"
            clearable
          >
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="机构号">
          <el-select
            v-model="search.org_number"
            placeholder="--请选择--"
            clearable
          >
            <el-option
              v-for="(value, key) in orgNoMap"
              :key="key"
              :label="value"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6">
        <el-button @click="searchHandle">查询</el-button>
        <el-button @click="reset">重置</el-button>
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
    <el-table-column prop="teller_no" label="柜员号" width="80" />
    <el-table-column prop="teller_name" label="柜员姓名" width="80" />
    <el-table-column prop="teller_type" label="柜员类型">
      <template #default="scope">
        <span>{{ tellerTypeMap[scope.row.teller_type] }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="org_number" label="机构号" width="80" />
    <el-table-column prop="org_name" label="机构名称" />
    <el-table-column prop="teller_status" label="柜员状态">
      <template #default="scope">
        <span>{{ tellerStatusMap[scope.row.teller_status] }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="teller_source_me" label="柜员来源" />
    <el-table-column label="操作" align="center" width="220">
      <template #default="scope">
        <div class="operate_btn">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            维护柜员
          </el-button>
          <el-button size="small" @click="setRole(scope.row)">
            角色设置
          </el-button>
          <el-popconfirm
            :title="`确定要删除${scope.row.teller_no}柜员吗?`"
            icon="Delete"
            @confirm="handleDelete(scope.row)"
          >
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </div>
        <!-- <div class="operate_btn"> 
          <el-button size="small" @click="setRole(scope.row)">
            角色设置
          </el-button>
          <el-button size="small" @click="setRole(scope.row)">
            主岗设置
          </el-button>
         </div> -->
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
              <el-option
                v-for="(value, key) in tellerStatusMap"
                :key="key"
                :label="value"
                :value="key"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="柜员类型" :label-width="formLabelWidth">
            <el-select v-model="formData.teller_type" placeholder="--请选择--">
              <el-option
                v-for="(value, key) in tellerTypeMap"
                :key="key"
                :label="value"
                :value="key"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
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
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitDialogForm">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <RoleSet
    :data="currentRow"
    :isShow="roleSetVisible"
    @closeRoleset="setIsShow"
    :title="roleSetTitle"
  />
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from "vue";
import { getTellerList, updateTeller, delTeller } from "@/api/teller";
import { ElMessage } from "element-plus";
import { datamap } from "@/utils/util";
import RoleSet from "./roleSet.vue";
type Iobj = { [propname: string]: any };
type Idatamap = { orgNoMap: Iobj; tellerTypeMap: Iobj; tellerStatusMap: Iobj };
const { orgNoMap, tellerTypeMap, tellerStatusMap }: Idatamap = datamap;
let search = ref<any>({});
const dialogFormVisible = ref<boolean>(false);
let roleSetVisible = ref<boolean>(false);
const roleSetTitle = ref("");
const dialogTitle = ref<string>("新增柜员");
let formData = reactive<any>({});
const formLabelWidth = "100px";
let tableData = ref<any>([]);
let currentRow = ref({});
function setIsShow() {
  console.log(1111);
  roleSetVisible.value = false;
}
function handleEdit(index: number, row: any) {
  console.log(index);
  dialogTitle.value = "编辑柜员";
  dialogFormVisible.value = true;
  Object.assign(formData, row);
  console.log(formData);
}

async function submitDialogForm() {
  const res = await updateTeller(formData);
  if (res.code === 200) {
    dialogFormVisible.value = false;
    getData();
  } else {
    ElMessage({
      message: "请求失败",
      type: "error",
    });
  }
}

async function handleDelete(row: any) {
  const res = await delTeller({ id: row.id });
  if (res.code === 200) {
    dialogFormVisible.value = false;
    getData();
  } else {
    ElMessage({
      message: "请求失败",
      type: "error",
    });
  }
}
function setRole(row: any) {
  currentRow.value = row;
  roleSetVisible.value = true;
  roleSetTitle.value = `角色设置(${row.user_account || "未知"})`;
}
const getData = () => {
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
};
onMounted(() => {
  getData();
});

function addTeller() {
  dialogFormVisible.value = true;
  formData = reactive({});
}
function searchHandle() {
  getData();
}
function reset() {
  search.value = ref({});
  getData();
}
</script>

<style scoped lang="scss">
:deep(.cell) {
  text-align: center;
  padding: 0 4px;
}
.operate_btn {
  display: flex;
  justify-content: center;
  padding: 2px 0;
}
.role_box {
  display: flex;
  .role_left {
    width: 50%;
    border-right: 1px solid #cbcbcb;
    padding: 0 20px;
    margin-right: 20px;
    > ul {
      height: 350px;
      overflow: auto;
    }
    & .role_left_li {
      display: flex;
      border-bottom: 1px solid #f1f1f1;
      align-items: center;
      line-height: 25px;
      & .role_check_span {
        width: 50px;
      }
      & .role_number_span {
        width: 80px;
      }
      & .role_name_span {
        flex: 1;
      }
    }
  }
  .role_right {
    width: 50%;
    & .primary_title {
      line-height: 35px;
    }
  }
}
</style>
