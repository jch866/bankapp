export const routes = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    name: "layout",
    meta: {
      title: "", //为空，隐藏面包屑
      hidden: false, // 是否在左侧菜单栏中显示
      icon: "FullScreen",
    },
    redirect: "/home",
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
    path: "/acl",
    component: () => import("@/layout/index.vue"),
    name: "Acl",
    meta: {
      title: "权限管理",
      icon: "Lock",
    },
    redirect: "/acl/user",
    children: [
      {
        path: "/acl/user",
        component: () => import("@/views/acl/user/index.vue"),
        name: "User",
        meta: {
          title: "用户管理",
          icon: "User",
        },
      },
      {
        path: "/acl/role",
        component: () => import("@/views/acl/role/index.vue"),
        name: "Role",
        meta: {
          title: "角色管理",
          icon: "UserFilled",
        },
      },
      {
        path: "/acl/permission",
        component: () => import("@/views/acl/permission/index.vue"),
        name: "Permission",
        meta: {
          title: "菜单管理",
          icon: "Monitor",
        },
      },
    ],
  },
  {
    path: "/product",
    component: () => import("@/layout/index.vue"),
    name: "Product",
    meta: {
      title: "商品管理",
      icon: "Goods",
    },
    redirect: "/product/trademark",
    children: [
      {
        path: "/product/trademark",
        component: () => import("@/views/product/trademark/index.vue"),
        name: "Trademark",
        meta: {
          title: "品牌管理",
          icon: "ShoppingCartFull",
        },
      },
      {
        path: "/product/attr",
        component: () => import("@/views/product/attr/index.vue"),
        name: "Attr",
        meta: {
          title: "属性管理",
          icon: "ChromeFilled",
        },
      },
      {
        path: "/product/spu",
        component: () => import("@/views/product/spu/index.vue"),
        name: "Spu",
        meta: {
          title: "SPU管理",
          icon: "Calendar",
        },
      },
      {
        path: "/product/sku",
        component: () => import("@/views/product/sku/index.vue"),
        name: "Sku",
        meta: {
          title: "SKU管理",
          icon: "Orange",
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
