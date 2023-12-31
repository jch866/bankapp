import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routes";

import NProgress from "nprogress"; // 导入 nprogress模块
import "nprogress/nprogress.css"; // 导入样式，否则看不到效果
NProgress.configure({ showSpinner: false });
import useUserStore from "@/store/modules/user";
import pinia from "@/store";
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  //滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});
const userStore = useUserStore(pinia);
router.beforeEach(async (to, from, next) => {
  NProgress.start(); //开启进度条
  document.title = `武汉农商行 - ${to.meta.title}`;
  const LOGINPATH = "/login";
  //获取token,去判断用户登录、还是未登录
  const token = userStore.token;
  //获取用户名字
  const username = userStore.username;
  //用户登录判断
  if (token) {
    //登录成功,访问login,不能访问,指向首页
    if (to.path == LOGINPATH) {
      next({ path: "/" });
    } else {
      //登录成功访问其余六个路由(登录排除)
      //有用户信息
      if (username) {
        //放行
        next();
      } else {
        //如果没有用户信息,在守卫这里发请求获取到了用户信息再放行
        try {
          //获取用户信息
          await userStore.userInfo();
          //放行
          //万一:刷新的时候是异步路由,有可能获取到用户信息、异步路由还没有加载完毕,出现空白的效果
          next({ ...to });
        } catch (error) {
          //token过期:获取不到用户信息了 或者用户手动修改本地存储token
          //退出登录->用户相关的数据清空
          await userStore.userLogout();
          next({ path: LOGINPATH, query: { redirect: to.path } });
        }
      }
    }
  } else {
    //用户未登录判断
    if (to.path == LOGINPATH) {
      next();
    } else {
      next({ path: LOGINPATH, query: { redirect: to.path } });
    }
  }
});
router.afterEach(() => {
  NProgress.done(); //完成进度条
});
export default router;
