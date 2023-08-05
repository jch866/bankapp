<template>
  <template v-if="!flag">
    <Layout></Layout>
  </template>
  <template v-else>
    <router-view></router-view>
  </template>
</template>
<script setup lang="ts">
import Layout from "@/layout/index.vue";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import useHeadTagsStore from "@/store/modules/tags";
const $route = useRoute();
const headTagsStore = useHeadTagsStore();
const flag = ref<boolean>(true);

const routeName = ["Screen", "Login"];

watch(
  () => $route.name,
  () => {
    flag.value = !!routeName.includes($route.name as string);
    console.log(flag.value);
    if ($route.name === "404") {
      headTagsStore.clearActivePath();
    }
  },
);
</script>
<style scoped lang="scss"></style>
