<template>
  <div class="logo" v-if="!setting.hideLogo">
    <img :src="setting.image" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from "./setting";
</script>
<script lang="ts">
export default {
  name: "Login",
};
</script>
<style scoped lang="scss">
.logo {
  display: flex;
  width: 100%;
  align-items: center;
  padding: 5px;

  img {
    height: 50px;
    width: 50px;
  }

  p {
    flex: 1;
    font-size: $base-logo-title-fontSize;
    padding-left: 10px;
    white-space: nowrap;
  }
}
</style>
