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
    v-loading="tableDataLoading"
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
          <el-button size="small" @click="editTeller(scope.$index, scope.row)">
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
  <Pagination :pageObj="pageObj" @pageChange="getData" />
  <TellEdit
    :isShow="dialogFormVisible"
    :data="currentEditRow"
    :title="dialogTitle"
    @closeTellerEdit="closeTellerHandler"
  />
  <RoleSet
    :data="currentRow"
    :isShow="roleSetVisible"
    @closeRoleset="closeRoleHandler"
    :title="roleSetTitle"
  />
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from "vue";
import { getTellerList, delTeller } from "@/api/teller";
import { ElMessage } from "element-plus";
import { datamap, clearEmptyPro } from "@/utils/util";
import RoleSet from "./roleSet.vue";
import TellEdit from "./tellerEdit.vue";
type Iobj = { [propname: string]: any };
type Idatamap = { orgNoMap: Iobj; tellerTypeMap: Iobj; tellerStatusMap: Iobj };
const { orgNoMap, tellerTypeMap, tellerStatusMap }: Idatamap = datamap;
let search = ref<any>({});
const dialogFormVisible = ref<boolean>(false);
const dialogTitle = ref<string>("新增柜员");
let roleSetVisible = ref<boolean>(false);
const roleSetTitle = ref("");
let tableData = ref<any>([]);
let currentRow = ref({});
let currentEditRow = ref({});
let tableDataLoading = ref<boolean>(false);

let pageObj = ref({ page: 1, pageSize: 10, showTotal: true, total: 0 });
function closeRoleHandler() {
  roleSetVisible.value = false;
}
function addTeller() {
  dialogFormVisible.value = true;
  dialogTitle.value = "新增柜员";
  currentEditRow.value = {};
}
function editTeller(index: number, row: any) {
  console.log(index);
  dialogTitle.value = "编辑柜员";
  currentEditRow.value = row;
  dialogFormVisible.value = true;
}

const closeTellerHandler = (flag: boolean) => {
  //关闭弹窗  正常关闭不刷新表格数据 反之刷新
  dialogFormVisible.value = false;
  currentEditRow.value = {};
  flag && getData();
};
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
  const { page, pageSize } = pageObj.value;
  // const params = {page,pageSize}

  let newsearch = clearEmptyPro(search.value);
  console.log(newsearch);
  const params = Object.assign(newsearch, { page, pageSize });
  tableDataLoading.value = true;
  getTellerList(params).then((res) => {
    tableDataLoading.value = false;
    if (res.code === 200) {
      tableData.value = res.data;
      pageObj.value.total = res.total;
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

function searchHandle() {
  getData();
}
function reset() {
  search.value.teller_no = "";
  search.value.org_number = "";
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
