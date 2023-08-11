<template>
  <div class="search_box">
    <el-row>
      <el-col :span="6">
        <el-form-item label="柜员号">
          <el-select v-model="search.region" placeholder="--请选择--" clearable>
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="机构号">
          <el-select v-model="search.node" placeholder="--请选择--" clearable>
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
    <el-table-column prop="teller_no" label="柜员号" width="120" />
    <el-table-column prop="teller_name" label="柜员姓名" width="120" />
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
    <el-table-column label="操作" align="center" width="180">
      <template #default="scope">
        <div class="operate_btn">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            维护柜员
          </el-button>
          <el-popconfirm
            :title="`确定要删除${scope.row.teller_no}柜员吗?`"
            icon="Delete"
            @confirm="handleDelete(scope.row)"
          >
            <template #reference>
              <el-button size="small" type="danger">删除柜员</el-button>
            </template>
          </el-popconfirm>
        </div>
        <div class="operate_btn">
          <el-button size="small" @click="setRole(scope.row)">
            角色设置
          </el-button>
          <el-button size="small" @click="setRole(scope.row)">
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
        <el-button type="primary" @click="submitDialogForm">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model="roleSetVisible"
    :title="roleSetTitle"
    :destroy-on-close="true"
  >
    <div class="role_box">
      <div class="role_left">
        <ul>
          <li class="role_left_li">
            <span class="role_check_span"></span>
            <span class="role_number_span">角色编号</span>
            <span class="role_name_span">角色名称</span>
          </li>
          <li
            v-for="item in roleList"
            :key="item.role_number"
            class="role_left_li"
          >
            <span class="role_check_span">
              <el-checkbox
                v-model="item.isChecked"
                @change="roleCheckeHandler"
              />
            </span>
            <span class="role_number_span">{{ item.role_number }}</span>
            <span class="role_name_span">{{ item.role_name }}</span>
          </li>
        </ul>
      </div>
      <div class="role_right">
        <p class="primary_title">主岗设置</p>
        <el-select
          v-model="primaryRole"
          @change="primaryRoleChange"
          placeholder="--请选择--"
          clearable
          filterable
        >
          <el-option
            v-for="item in roleList_checked"
            :key="item.role_number"
            :value="item.role_number"
            :label="`${item.role_number} ${item.role_name}`"
          ></el-option>
        </el-select>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="roleSetVisible = false">取消</el-button>
        <el-button type="primary" @click="submitRoleSet">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from "vue";
import {
  getTellerList,
  updateTeller,
  delTeller,
  getRoleList,
  updateRole,
} from "@/api/teller";
import { ElMessage } from "element-plus";
import { datamap } from "@/utils/util";
type Iobj = { [propname: string]: any };
type Idatamap = { orgNoMap: Iobj; tellerTypeMap: Iobj; tellerStatusMap: Iobj };
const { orgNoMap, tellerTypeMap, tellerStatusMap }: Idatamap = datamap;
let search = reactive<any>({});
const dialogFormVisible = ref<boolean>(false);
const roleSetVisible = ref<boolean>(false);
const roleSetTitle = ref("");
const dialogTitle = ref<string>("新增柜员");
let formData = reactive<any>({});
const formLabelWidth = "100px";
let tableData = ref<any>([]);
let roleList = ref<any>([]);
let roleList_checked = ref<any>([]);
let primaryRole = ref("");
// const checkList = ref(["selected and disabled", "Option A"]);
function handleEdit(index: number, row: any) {
  console.log(index);
  // console.log(row);
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
function submitRoleSet() {
  console.log(roleList.value);
  // let list = roleList.value.filter((item:any)=>item.isChecked);
  const params = { list: roleList.value };
  if (primaryRole.value === "") {
    ElMessage({
      message: "请选择主岗",
      type: "error",
    });
    return;
  }
  updateRole(params);

  roleSetVisible.value = false;
}
function primaryRoleChange(value: string) {
  console.log(value);
  roleList.value = roleList.value.map((item: any) => {
    item.isMainRole = !!(item.role_number === value);
    return item;
  });
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
  roleSetVisible.value = true;
  roleSetTitle.value = `角色设置(${row.user_account || "未知"})`;
}
function roleCheckeHandler() {
  const filterData = roleList.value.filter((obj: any) => obj.isChecked);
  roleList_checked.value = filterData;
  primaryRole.value = "";
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
const getRoleData = () => {
  getRoleList().then((res) => {
    if (res.code === 200) {
      roleList.value = res.data;
      roleCheckeHandler();
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
  getRoleData();
});
// function handleSelectionChange(value:any){
//   roleList_checked.value = value;
//   // console.log(value)
// }
function addTeller() {
  dialogFormVisible.value = true;
  formData = reactive({});
  // Object.assign(formData, {});
}
function searchHandle() {
  getData();
}
function reset() {
  search = {};
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
