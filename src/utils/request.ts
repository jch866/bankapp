import axios from "axios";
import { ElMessage } from "element-plus";
//http 是axios实例
const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});
http.interceptors.request.use((config) => {
  console.log(config);
  config.headers.token = "";
  return config;
});
http.interceptors.response.use(
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
const request = (url: any, data: any, method = "get", opts?: any) => {
  return http({
    url,
    data,
    method,
    ...opts,
  });
};
export default request;
