import request from "@/utils/request";
const API = {
  getList: "/api/tellerlist",
  update: "/api/teller/update",
  del: "/api/teller/del",
};

export const getTellerList = () => request.get<any, any>(API.getList);
export const updateTeller = (data: any) =>
  request.post<any, any>(API.update, data);
export const delTeller = (data: any) => request.post<any, any>(API.del, data);
