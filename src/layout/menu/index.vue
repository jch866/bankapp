<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 无子路由 -->
    <template
      v-if="!item.children || (item.children && item.children.length === 0)"
    >
      <el-menu-item
        v-if="!item.meta.hidden"
        :index="item.path"
        @click="goRoute(item)"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>
            {{ item.meta.title }}
          </span>
        </template>
      </el-menu-item>
    </template>

    <!-- 子路由为1个 当前情况是 首页作为layout的第一个子路由来定的逻辑-->
    <!-- <template v-if="item.children && item.children.length === 1">
      <el-menu-item
        v-if="!item.children[0].meta.hidden"
        :index="item.children[0].path"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>
            {{ item.children[0].meta.title }}
          </span>
        </template>
      </el-menu-item>
    </template> -->

    <!-- 子路由大于1个 el-sub-menu -->
    <el-sub-menu
      v-if="item.children && item.children.length > 0"
      :index="item.path"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>
          {{ item.meta.title }}
        </span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import useHeadTagsStore from "@/store/modules/tags";
import type { RouteRecordRaw } from "vue-router";
const headTagsStore = useHeadTagsStore();
defineProps(["menuList"]);
const goRoute = (item: RouteRecordRaw) => {
  console.log(item.path);
  // 加入keepalive缓存
  headTagsStore.addKeepAliveCache(item.path);
  let submenu = {
    path: item.path,
    name: item.meta?.title,
    label: item.meta?.title,
  };
  const excludePath = ["/screen"];
  //禁止加入tags
  if (excludePath.includes(item.path)) {
    return;
  }
  headTagsStore.selectMenu(submenu);
};
</script>
<!-- 两组标签 script-->
<!-- 导出组件名，方便组件递归 -->
<script lang="ts">
export default {
  name: "Menu",
};
</script>
<style scoped></style>
