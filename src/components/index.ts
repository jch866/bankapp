import SvgIcon from "./SvgIcon/index.vue";
import Pagination from "./Pagination/index.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const allComponents: any = {
  SvgIcon,
  Pagination,
};

export default {
  install(app: any) {
    // console.log(app)
    Object.keys(allComponents).forEach((key) => {
      app.component(key, allComponents[key]);
    });
    //全局注册图标组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
