import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routes";
import { GET_TOKEN } from "@/utils/util";
import { useRouter } from "vue-router";

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
router.beforeEach((to, from, next) => {
  const LOGINPATH = "/login";
  if (to.path !== LOGINPATH && !GET_TOKEN()) {
    next({ path: LOGINPATH });
  } else {
    next();
  }
});
export default router;
