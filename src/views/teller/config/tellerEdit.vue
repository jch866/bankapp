<template>
  <el-dialog
    v-model="props.isShow"
    :title="props.title"
    :destroy-on-close="true"
    @close="closeHandler(false)"
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
        <el-button @click="closeHandler(false)">取消</el-button>
        <el-button type="primary" @click="submitDialogForm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref, watch } from "vue";
import { datamap } from "@/utils/util";
import { ElMessage } from "element-plus";
import { updateTeller } from "@/api/teller";
const props = defineProps(["isShow", "data", "title"]);
const $emit = defineEmits(["closeTellerEdit"]);
let formData = reactive<any>({});
type Iobj = { [propname: string]: any };
type Idatamap = { orgNoMap: Iobj; tellerTypeMap: Iobj; tellerStatusMap: Iobj };
const { orgNoMap, tellerTypeMap, tellerStatusMap }: Idatamap = datamap;
const formLabelWidth = "100px";
watch(
  () => props.isShow,
  () => {
    formData = props.isShow ? props.data : {};
  },
);
async function submitDialogForm() {
  const res = await updateTeller(formData);
  if (res.code === 200) {
    closeHandler(true);
  } else {
    ElMessage({
      message: "请求失败",
      type: "error",
    });
  }
}
const closeHandler = (flag: boolean) => {
  //val 是否要重新获取列表数据
  $emit("closeTellerEdit", flag);
};
</script>

<style scoped></style>
