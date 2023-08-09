import request from "@/utils/request";
const API = {
  getList: "/api/flowlist",
};

export const getFlowList = () => request.get<any, any>(API.getList);
