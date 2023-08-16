//创建用户相关的小仓库
import { defineStore } from "pinia";
//引入接口
import { reqLogin, reqUserInfo } from "@/api/user";
import type { loginFormData, loginResponseData } from "@/api/user/type";
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, DEL_TOKEN } from "@/utils/util";
import { routes } from "@/router/routes";
import type { RouteRecordRaw } from "vue-router";

interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  avatar: string;
  username: string;
}

//创建用户小仓库
const useUserStore = defineStore("User", {
  //小仓库存储数据地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      menuRoutes: routes, //仓库存储生成菜单需要数组(路由)
      username: "",
      avatar: "",
    };
  },
  //异步|逻辑的地方
  actions: {
    async userLogin(data: loginFormData) {
      const result: loginResponseData = await reqLogin(data);
      //登录请求:成功200->token
      //登录请求:失败201->登录失败错误的信息
      if (result.code == 200) {
        this.token = result.data as string;
        SET_TOKEN(result.data as string);
        //能保证当前async函数返回一个成功的promise
        return "ok";
      } else {
        return Promise.reject(new Error(result.data));
      }
    },
    //获取用户信息方法
    async userInfo() {
      //获取用户信息进行存储仓库当中[用户头像、名字]
      const result: any = await reqUserInfo();
      //如果获取用户信息成功，存储一下用户信息
      if (result.code == 200) {
        this.username = result.data.checkUser.username;
        this.avatar = result.data.checkUser.avatar;
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    //退出登录
    async userLogout() {
      this.token = "";
      this.username = "";
      this.avatar = "";
      DEL_TOKEN();
      return "ok";
      // const result: any = await reqLogout();
      // if (result.code == 200) {} else {
      //   return Promise.reject(new Error(result.message));
      // }
    },
  },
  getters: {},
});
//对外暴露获取小仓库方法
export default useUserStore;
