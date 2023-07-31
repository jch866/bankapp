<template>
  <template v-for="(item, index) in menuList" :key="item.path">
    <!-- 无子路由 -->
    <el-menu-item
      v-if="!item.children || (item.children && item.children.length === 0)"
      :index="item.path"
    >
      <template #title>
        <span>图标 &nbsp;</span>
        <span>
          {{ item.meta.title }}
        </span>
      </template>
    </el-menu-item>
    <!-- 子路由为1个 -->
    <el-menu-item
      v-if="item.children && item.children.length === 1"
      :index="item.children[0].path"
    >
      <template #title>
        <span>图标 &nbsp;</span>
        <span>
          {{ item.children[0].meta.title }}
        </span>
      </template>
    </el-menu-item>
    <!-- 子路由大于1个 el-sub-menu -->
    <el-sub-menu
      v-if="item.children && item.children.length > 1"
      :index="item.path"
    >
      <template #title>
        <span>图标 &nbsp;</span>
        <span>
          {{ item.meta.title }}
        </span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
defineProps(["menuList"]);
</script>
<!-- 两组标签 script-->
<!-- 导出组件名，方便组件递归 -->
<script lang="ts">
export default {
  name: "Menu",
};
</script>
<style scoped></style>
