<template>
  <el-button type="danger" :icon="Plus">123</el-button>
  <router-view></router-view>
  <Test></Test>

  <svg-icon name="home" color="blue" width="30px" height="30px" />
</template>
<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue";
import Test from "@/components/test.vue";
import { reqLogin } from "@/api/user";
import { onMounted } from "vue";
onMounted(() => {
  const data = {
    username: "admin",
    password: "111111",
  };
  reqLogin(data).then((res) => {
    console.log(res);
  });
});
</script>
<style scoped lang="scss"></style>
