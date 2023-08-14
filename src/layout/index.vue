<!-- 组件库有布局container代码 -->
<template>
  <div class="layout_container">
    <div class="layout_slider" :class="{ fold: !!layOutSettingStore.fold }">
      <Logo />
      <el-scrollbar class="scrollbar">
        <!-- router : 是否启用 vue-router 模式。 启用该模式会在激活导航时以 index 作为 path 进行路由跳转 使用 default-active 来设置加载时的激活项。 -->
        <!-- collapse -->
        <!-- default-active 页面加载时默认激活菜单的 index -->
        <el-menu
          background-color="#001529"
          text-color="#fff"
          router
          :default-active="$route.path"
          :collapse="layOutSettingStore.fold"
          :collapse-transition="false"
        >
          <Menu :menuList="useUser.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>

    <div class="layout_tabbar" :class="{ fold: !!layOutSettingStore.fold }">
      <Tabbar />
      <HeadTags />
    </div>
    <div class="layout_main" :class="{ fold: !!layOutSettingStore.fold }">
      <Main />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
//引入左侧菜单logo子组件
import Logo from "./logo/index.vue";
//引入菜单组件
import Menu from "./menu/index.vue";
//右侧内容展示区域
import Main from "./main/index.vue";
//引入顶部tabbar组件
import Tabbar from "./tabbar/index.vue";
import HeadTags from "./headtags/index.vue";
import useUserStore from "@/store/modules/user";
import useLayOutSettingStore from "@/store/modules/setting";
const useUser = useUserStore();
const layOutSettingStore = useLayOutSettingStore();
const $route = useRoute();
// console.log($route.path);
</script>
<script lang="ts">
export default {
  name: "Layout",
};
</script>
<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    color: white;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height - 10px);

      .el-menu {
        border-right: none;
      }
    }
    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;
    border-bottom: 2px solid #cbcbcb;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height - $base-head-tags-height);
    left: $base-menu-width;
    top: calc($base-tabbar-height + $base-head-tags-height);
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
