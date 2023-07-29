import { createApp } from "vue";
import App from "./App.vue";
import "@/styles/index.scss";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});
//svg 插件配置代码
import "virtual:svg-icons-register";
//注册全局组件
// import SvgIcon from "@/components/SvgIcon/index.vue";
// app.component("SvgIcon", SvgIcon);
import GlobalComponent from "@/components/index.ts";
//批量安装自定义组件
app.use(GlobalComponent);
app.mount("#app");
