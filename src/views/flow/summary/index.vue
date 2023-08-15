<template>
  <div class="search_box">
    <el-row>
      <el-col :span="6">
        <el-form-item label="起始日期">
          <el-date-picker
            v-model="search.instance_startdate"
            type="datetime"
            placeholder="请选择日期"
            format="YYYY-MM-DD HH:mm"
            value-format="YYYY-MM-DD HH:mm"
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="终止日期">
          <el-date-picker
            v-model="search.instance_enddate"
            type="datetime"
            placeholder="请选择日期"
            format="YYYY-MM-DD HH:mm"
            value-format="YYYY-MM-DD HH:mm"
          />
        </el-form-item>
      </el-col>
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
        <el-form-item label="机构号/名称">
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
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="交易码/名称">
          <el-select v-model="search.txcode" placeholder="--请选择--" clearable>
            <el-option
              v-for="(value, key) in txcodeStatusMap"
              :key="key"
              :label="value"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="流程状态">
          <el-select
            v-model="search.instance_status"
            placeholder="--请选择--"
            clearable
          >
            <el-option
              v-for="(value, key) in instanceStatusMap"
              :key="key"
              :label="value"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="发起柜员号">
          <el-input v-model="search.teller_no" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="前端流水号">
          <el-input v-model="search.trace" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6"></el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6">
        <el-button @click="searchHandle">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-col>
    </el-row>
  </div>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    header-cell-class-name="table-header-th"
  >
    <el-table-column type="index" width="50" />
    <el-table-column
      prop="instance_startdate"
      label="交易发起时间"
      width="180"
    />
    <el-table-column prop="instance_enddate" label="流程结束日期" width="180" />
    <el-table-column prop="trace" label="前端流水号" />
    <el-table-column prop="txcode" label="交易码" />

    <el-table-column label="交易名称">
      <template #default="scope">
        <span>{{ txcodeStatusMap[scope.row.txcode] }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="allocate_channel" label="汇划渠道" />
    <el-table-column prop="tx_money" label="交易金额" />
    <el-table-column label="流程状态">
      <template #default="scope">
        <span>{{ instanceStatusMap[scope.row.instance_status] }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="org_number" label="发起机构号" />
    <el-table-column prop="org_name" label="发起机构名称" />
    <el-table-column prop="teller_no" label="发起柜员号" />
    <el-table-column prop="teller_name" label="发起柜员名称" />
  </el-table>
  <Pagination :pageObj="pageObj" @pageChange="getData" />
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from "vue";
import { getFlowList } from "@/api/flow";
import { ElMessage } from "element-plus";
import { datamap, clearEmptyPro } from "@/utils/util";
let pageObj = ref({ page: 1, pageSize: 2, showTotal: true, total: 0 });
type Iobj = { [propname: string]: any };
type Idatamap = {
  orgNoMap: Iobj;
  tellerTypeMap: Iobj;
  tellerStatusMap: Iobj;
  orgTypeMap: Iobj;
  instanceStatusMap: Iobj;
  txcodeStatusMap: Iobj;
};
const {
  orgNoMap,
  orgTypeMap,
  instanceStatusMap,
  txcodeStatusMap,
  tellerTypeMap,
  tellerStatusMap,
}: Idatamap = datamap;
const search = reactive<any>({});
let tableData = ref<any>([]);

async function getData() {
  const { page, pageSize } = pageObj.value;
  let newsearch = clearEmptyPro(search);
  const params = Object.assign(newsearch, { page, pageSize });
  const res = await getFlowList(params);
  if (res.code === 200) {
    tableData.value = res.data;
    pageObj.value.total = res.total;
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
  console.log(search);
  getData();
}
function reset() {
  search.instance_startdate = "";
  search.instance_enddate = "";
  search.org_type = "";
  search.org_number = "";
  search.txcode = "";
  search.instance_status = "";
  search.teller_no = "";
  search.trace = "";
  getData();
}
</script>

<style scoped>
:deep(.cell) {
  text-align: center;
  padding: 0 4px;
}
</style>
