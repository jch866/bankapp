import { defineStore } from "pinia";
import { reqLogin } from "@/api/user";
import { loginForm } from "@/api/user/type";
import { SET_TOKEN, GET_TOKEN } from "@/utils/util";
import { routes } from "@/router/routes";
import type { RouteRecordRaw } from "vue-router";
interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
}
const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: routes, // 把常量路由放在用户信息中
    };
  },
  actions: {
    async userLogin(data: loginForm) {
      let result = await reqLogin(data);
      console.log(result);
      if (result.code === 200) {
        this.token = result.data.token;
        SET_TOKEN(result.data.token);
      } else {
      }
    },
    userLogout() {},
  },
  getters: {},
});

export default useUserStore;
