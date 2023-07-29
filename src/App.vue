<template>
  <el-button type="danger" :icon="Plus">123</el-button>

  <Test></Test>

  <svg-icon name="home" color="blue" width="30px" height="30px" />
</template>
<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue";
import Test from "@/components/test.vue";
</script>
<style scoped lang="scss"></style>
