<template>
  <el-dialog
    v-model="props.isShow"
    :title="props.title"
    :destroy-on-close="true"
    @close="closeHandler"
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
        <el-button @click="closeHandler">取消</el-button>
        <el-button type="primary" @click="submitRoleSet">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { getRoleList, updateRole } from "@/api/teller";
import { ElMessage } from "element-plus";
const props = defineProps(["data", "isShow", "title"]);
const emits = defineEmits(["closeRoleset"]);
let roleList = ref<any>([]);
let roleList_checked = ref<any>([]);
let primaryRole = ref("");
watch(
  () => props.isShow,
  (value) => {
    if (value && props.data.user_account) {
      getRoleData(props.data.user_account);
    }
  },
);
const getRoleData = (user_account: string) => {
  getRoleList(user_account).then((res) => {
    if (res.code === 200) {
      roleList.value = res.data;
      setCheckedMainRole();
    } else {
      ElMessage({
        message: "请求失败",
        type: "error",
      });
    }
  });
};

const closeHandler = () => {
  // console.log(Date.now())
  roleList.value = [];
  roleList_checked.value = [];
  primaryRole.value = "";
  emits("closeRoleset");
};

async function submitRoleSet() {
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
  const res = await updateRole(params);
  // roleSetVisible.value = false;
  if (res.code == 200) {
    emits("closeRoleset");
    ElMessage({
      message: "设置成功",
      type: "success",
    });
  } else {
    ElMessage({
      message: "设置失败",
      type: "error",
    });
  }
}
//主岗设置
function primaryRoleChange(value: string) {
  console.log(value);
  // primaryRole.value = value; el-select组件会自动赋值
  roleList.value = roleList.value.map((item: any) => {
    item.isMainRole = !!(item.role_number === value);
    return item;
  });
}

//弹窗初始化的时候赋值
function setCheckedMainRole() {
  const filterData = roleList.value.filter((obj: any) => obj.isChecked);
  roleList_checked.value = filterData;
  const mainRoleArray = filterData.filter((obj: any) => obj.isMainRole);
  primaryRole.value =
    mainRoleArray.length > 0 ? mainRoleArray[0].role_number : "";
}
//过滤出已经勾选的角色设置
function roleCheckeHandler() {
  const filterData = roleList.value.filter((obj: any) => obj.isChecked);
  roleList_checked.value = filterData;
  primaryRole.value = "";
}
</script>
<script lang="ts">
export default {
  name: "RoleSet",
};
</script>
<style scoped lang="scss">
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
