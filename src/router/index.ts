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
  NProgress.start();
  // document.title = `武汉农商行 - ${to.meta.title}`;
  const LOGINPATH = "/login";
  const token = userStore.token;
  const username = userStore.username;
  if (token) {
    //登录成功,访问login,不能访问,指向首页
    if (to.path == LOGINPATH) {
      next({ path: "/" });
    } else {
      if (username) {
        next();
      } else {
        try {
          await userStore.userInfo();
          //万一:刷新的时候是异步路由,有可能获取到用户信息、异步路由还没有加载完毕,出现空白的效果
          next({ ...to });
        } catch (error) {
          //token过期:获取不到用户信息了 或者用户手动修改本地存储token 退出登录->用户相关的数据清空
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
