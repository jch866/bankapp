import request from "@/utils/request";
const API = {
  getList: "/api/flowlist",
};

export const getFlowList = (data: any) =>
  request.get<any, any>(API.getList, { params: data });
