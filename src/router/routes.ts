export const routes = [
  // {
  //   path: "/",
  //   component: () => import("@/layout/index.vue"),
  //   name: "layout",
  //   meta: {
  //     title: "主页", //为空，隐藏面包屑
  //     hidden: false, // 是否在左侧菜单栏中显示
  //     icon: "FullScreen",
  //   },
  //   redirect: "/home",
  //   children: [
  //     {
  //       path: "/home",
  //       component: () => import("@/views/home/index.vue"),
  //       name: "home",
  //       meta: {
  //         title: "主页",
  //         hidden: false,
  //         icon: "House",
  //       },
  //     },
  //   ],
  // },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "login",
    meta: {
      title: "登录",
      hidden: true,
      icon: "User",
    },
  },

  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404",
    meta: {
      title: "404页面",
      hidden: true,
      icon: "Compass",
    },
  },
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    name: "Task",
    meta: {
      title: "预警监控",
      icon: "Lock",
    },
    redirect: "/task/warning",
    children: [
      {
        path: "/task/warning",
        component: () => import("@/views/task/warning/index.vue"),
        name: "Warning",
        meta: {
          title: "任务预警",
          icon: "User",
        },
      },
    ],
  },
  {
    path: "/product",
    component: () => import("@/layout/index.vue"),
    name: "Product",
    meta: {
      title: "流程实时查询",
      icon: "Goods",
    },
    redirect: "/flow/summary",
    children: [
      {
        path: "/flow/summary",
        component: () => import("@/views/flow/summary/index.vue"),
        name: "Summary",
        meta: {
          title: "流程汇总查询",
          icon: "ShoppingCartFull",
        },
      },
    ],
  },
  {
    path: "/teller",
    component: () => import("@/layout/index.vue"),
    name: "Teller",
    meta: {
      title: "集中作业平台参数维护",
      icon: "Goods",
    },
    redirect: "/teller/config",
    children: [
      {
        path: "/teller/config",
        component: () => import("@/views/teller/config/index.vue"),
        name: "config",
        meta: {
          title: "人员配置",
          icon: "ShoppingCartFull",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "any",
    meta: {
      title: "任意页",
      hidden: true,
      icon: "Finished",
    },
  },
];
