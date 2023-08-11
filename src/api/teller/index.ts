import request from "@/utils/request";
const API = {
  getList: "/api/teller/list",
  update: "/api/teller/update",
  del: "/api/teller/del",
  role: "/api/teller/roles",
  updateRole: "/api/teller/rolesupdate",
};

export const getTellerList = () => request.get<any, any>(API.getList);
export const updateTeller = (data: any) =>
  request.post<any, any>(API.update, data);
export const delTeller = (data: any) => request.post<any, any>(API.del, data);
export const getRoleList = () => request.get<any, any>(API.role);
export const updateRole = (data: any) =>
  request.post<any, any>(API.updateRole, data);
