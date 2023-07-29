<template>
  <el-button type="danger" :icon="Plus">123</el-button>
  <el-pagination
    :page-size="20"
    :pager-count="11"
    layout="prev, pager, next"
    :total="1000"
  ></el-pagination>
</template>
<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue";
</script>
<style scoped lang="scss"></style>
