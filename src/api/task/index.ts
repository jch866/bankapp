import request from "@/utils/request";
const API = {
  getList: "/api/tasklist",
};

export const getTaskList = (params?: object) =>
  request.get<any, any>(API.getList, { params });
