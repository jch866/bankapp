<template>
  <!-- <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" v-if="flag"></component>
      </transition>
    </router-view>  -->
  <router-view></router-view>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from "vue";
import useLayOutSettingStore from "@/store/modules/setting";
const layoutSettingStore = useLayOutSettingStore();
//控制当前组件是否销毁重建
let flag = ref(true);

//监听仓库内部数据是否发生变化,如果发生变化，说明用户点击过刷新按钮
watch(
  () => layoutSettingStore.refresh,
  () => {
    //点击刷新按钮:路由组件销毁
    nextTick(() => {
      flag.value = true;
    });
  },
);
</script>
<script lang="ts">
export default {
  name: "Main",
};
</script>
<style scoped></style>
