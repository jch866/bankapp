import request from "@/utils/request";
const API = {
  getList: "/api/tellerlist",
};

export const getTellerList = () => request.get<any, any>(API.getList);
