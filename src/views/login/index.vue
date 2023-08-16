<template>
  <div class="login_container">
    <el-form
      class="login_form"
      :model="loginForm"
      :rules="rules"
      ref="loginForms"
    >
      <!-- <h1>Hello</h1> -->
      <h2>武汉农商行监控应用</h2>
      <el-form-item prop="username">
        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          :prefix-icon="Lock"
          v-model="loginForm.password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          class="login_btn"
          type="primary"
          size="default"
          @click="login"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import { getTime } from "@/utils/util";
import useUserStore from "@/store/modules/user";
let useStore = useUserStore();
let loginForms = ref();
let $router = useRouter();
let $route = useRoute();
let loading = ref(false);
let loginForm = reactive({ username: "admin", password: "111111" });
const login = async () => {
  await loginForms.value.validate();
  loading.value = true;
  try {
    await useStore.userLogin(loginForm);
    let redirect: any = $route.query.redirect;
    $router.push({ path: redirect || "/" });
    ElNotification({
      type: "success",
      message: "欢迎回来",
      title: `HI,${getTime()}好`,
    });
    loading.value = false;
  } catch (error) {
    loading.value = false;
    ElNotification({
      type: "error",
      message: (error as Error).message,
    });
  }
};
const validatorUserName = (_rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback();
  } else {
    callback(new Error("账号长度至少五位"));
  }
};

const validatorPassword = (_rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback();
  } else {
    callback(new Error("密码长度至少六位"));
  }
};

//定义表单校验需要配置对象
const rules = {
  username: [{ trigger: "change", validator: validatorUserName }],
  password: [{ trigger: "change", validator: validatorPassword }],
};
</script>
<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  .login_form {
    margin-top: 20vh;
    width: 40%;
    height: 40vh;
    padding: 40px;
    border: 1px solid #333;

    h1 {
      color: #333;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: #333;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
