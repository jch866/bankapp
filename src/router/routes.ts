export const routes = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    name: "layout",
    meta: {
      title: "layout",
      hidden: false, // 是否在左侧菜单栏中显示
      icon: "FullScreen",
    },
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        name: "home",
        meta: {
          title: "主页",
          hidden: false,
          icon: "House",
        },
      },
      // {
      //   path: "/test",
      //   component: () => import("@/views/home/index.vue"),
      //   name: "test",
      //   meta: {
      //     title: "测试路由",
      //     hidden:false,
      //     icon:'Service'
      //   },
      // },
    ],
  },
  {
    path: "/screen",
    component: () => import("@/views/screen/index.vue"),
    name: "Screen",
    meta: {
      title: "大数据",
      hidden: false,
      icon: "Service",
    },
  },
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
