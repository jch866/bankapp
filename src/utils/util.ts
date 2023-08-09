export const SET_TOKEN = (token: string) => {
  window.localStorage.setItem("TOKEN", token);
};
export const GET_TOKEN = () => {
  return window.localStorage.getItem("TOKEN");
};
export const DEL_TOKEN = () => {
  window.localStorage.removeItem("TOKEN");
};
export const set_tags = (tag: any) => {
  window.sessionStorage.setItem("tags_list", JSON.stringify(tag));
};
export const get_tags = () => {
  return JSON.parse(window.sessionStorage.getItem("tags_list") as string);
};
export const set_activePath = (path: any) => {
  window.sessionStorage.setItem("tags_activePath", path);
};
export const get_activePath = () => {
  return window.sessionStorage.getItem("tags_activePath");
};
export const default_activePath = "/task/warning";
export const default_activeName = "任务预警";
//封装一个函数:获取一个结果:当前早上|上午|下午|晚上
export const getTime = () => {
  let message = "";
  //通过内置构造函数Date
  const hours = new Date().getHours();
  //情况的判断
  if (hours <= 9) {
    message = "早上";
  } else if (hours <= 12) {
    message = "上午";
  } else if (hours <= 18) {
    message = "下午";
  } else {
    message = "晚上";
  }
  return message;
};
export const filterData = (query: object, data: []) => {
  if (!query || data.length === 0) {
    return data;
  }
  const keys = Object.keys(query);
  const values = Object.values(query);
};
