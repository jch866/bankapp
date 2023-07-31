export const routes = [
  // {
  //     path: "/",
  //     redirect:'/home'
  // },
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    name: "layout",
    meta: {
      title: "layout",
    },
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        name: "home",
        meta: {
          title: "主页",
        },
      },
      {
        path: "/test",
        component: () => import("@/views/home/index.vue"),
        name: "test",
        meta: {
          title: "测试路由",
        },
      },
    ],
  },

  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "login",
    meta: {
      title: "登录",
    },
  },

  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404",
    meta: {
      title: "404页面",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "any",
    meta: {
      title: "任意页",
    },
  },
];
