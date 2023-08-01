<!-- 组件库有布局container代码 -->
<template>
  <div class="layout_container">
    <div class="layout_slider">
      <Logo />
      <el-scrollbar class="scrollbar">
        <!-- router : 是否启用 vue-router 模式。 启用该模式会在激活导航时以 index 作为 path 进行路由跳转 使用 default-active 来设置加载时的激活项。 -->
        <el-menu background-color="#001529" text-color="#fff" router>
          <Menu :menuList="useUser.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_tabbar">
      <Tabbar />
    </div>
    <div class="layout_main">
      <Main />
    </div>
  </div>
</template>

<script setup lang="ts">
//引入左侧菜单logo子组件
import Logo from "./logo/index.vue";
//引入菜单组件
import Menu from "./menu/index.vue";
//右侧内容展示区域
import Main from "./main/index.vue";
//引入顶部tabbar组件
import Tabbar from "./tabbar/index.vue";

import useUserStore from "@/store/modules/user";
const useUser = useUserStore();
console.log(useUser.menuRoutes);
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
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height - 10px);

      .el-menu {
        border-right: none;
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;
    background: rgb(184, 184, 255);
  }

  .layout_main {
    position: absolute;
    background: pink;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
  }
}
</style>
