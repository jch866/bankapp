import SvgIcon from "./SvgIcon/index.vue";
import Pagination from "./Pagination/index.vue";
const allComponents: any = {
  SvgIcon,
  Pagination,
};

export default {
  install(app: any) {
    // console.log(app)
    Object.keys(allComponents).forEach((key) => {
      console.log(key);
      app.component(key, allComponents[key]);
    });
  },
};
