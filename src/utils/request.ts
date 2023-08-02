import axios from "axios";
import useUserStore from "@/store/modules/user";
import { ElMessage } from "element-plus";
//request 是axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});
request.interceptors.request.use((config) => {
  let userStore = useUserStore();
  console.log(config);
  config.headers.token = userStore.token || "";
  return config;
});
request.interceptors.response.use(
  (response) => {
    //成功回调

    return response.data;
  },
  (error) => {
    //失败回调
    let message = "";
    let status = error.response.status;
    switch (status) {
      case 401:
        message = "TOKEN过期";
        break;
      case 403:
        message = "无权访问";
        break;
      case 404:
        message = "请求地址错误";
        break;
      case 500:
        message = "服务器出现问题";
        break;
      default:
        message = "网络出现问题";
        break;
    }
    //提示错误信息
    ElMessage({
      type: "error",
      message,
    });
    return Promise.reject(error);
  },
);

export default request;
