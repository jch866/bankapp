import { getTableData } from "./tool";

//  mydefined 代表自定义的
const list = [
  {
    id: 1,
    teller_no: 1, //柜员号
    teller_name: 1, //柜员名称
    teller_type: "01", //柜员类型  mydefined
    teller_source_me: 1, //柜员来源 mydefined
    org_number: "01001", //机构号
    org_name: "会计核算中心", //机构号
    teller_status: "01", //柜员状态
    telephone: 138888888, // 柜员电话
    mobile: 138888888, // 手机号
    sex: 1, // 性别
    en_name: "tom", // 英文名称
    teller_level: 1, //柜员级别
    workdate: "2000-01-01", //工作日期
    remark: "hello world",
    user_account: "000238",
  },
  {
    id: 2,
    teller_no: 2, //柜员号
    teller_name: 2, //柜员名称
    teller_type: "02", //柜员类型  mydefined
    teller_source_me: 2, //柜员来源 mydefined
    org_number: "01292", //机构号
    org_name: "运营管理部集中作业中心", //机构号
    teller_status: "02", //柜员状态
    telephone: 238888888, // 柜员电话
    mobile: 238888888, // 手机号
    sex: 2, // 性别
    en_name: "tom", // 英文名称
    teller_level: 2, //柜员级别
    workdate: "2000-01-01", //工作日期
    remark: "hello world",
    user_account: "000235",
  },
  {
    id: 3,
    teller_no: 3, //柜员号
    teller_name: 3, //柜员名称
    teller_type: "01", //柜员类型  mydefined
    teller_source_me: 3, //柜员来源 mydefined
    org_number: "01294", //机构号
    org_name: "XXXX支行", //机构号
    teller_status: "01", //柜员状态
    telephone: 338888888, // 柜员电话
    mobile: 338888888, // 手机号
    sex: 3, // 性别
    en_name: "tom", // 英文名称
    teller_level: 3, //柜员级别
    workdate: "2000-01-01", //工作日期
    remark: "hello world",
    user_account: "000236",
  },
];
let roles = [
  {
    id: 1,
    role_number: "001", //业务角色编号
    role_name: "省中心管理员", //角色名称
    user_account: "000238",
    isChecked: false, // 是否勾选
    isMainRole: false, // 是否主岗
  },
  {
    id: 2,
    role_number: "002",
    role_name: "省中心操作员",
    user_account: "000238",
    isChecked: false, // 是否勾选
    isMainRole: false, // 是否主岗
  },
  {
    id: 3,
    role_number: "004",
    role_name: "任务调试岗",
    user_account: "000235",
    isChecked: false, // 是否勾选
    isMainRole: false, // 是否主岗
  },
  {
    id: 4,
    role_number: "005",
    role_name: "集中作业中心监控",
    user_account: "000238",
    isChecked: false, // 是否勾选
    isMainRole: false, // 是否主岗
  },
  {
    id: 5,
    role_number: "JS01",
    role_name: "全单录入岗",
    user_account: "000235",
    isChecked: false,
  },
  {
    id: 6,
    role_number: "JS02",
    role_name: "录入复核员",
    user_account: "000238",
    isChecked: false,
  },
  {
    id: 7,
    role_number: "JS03",
    role_name: "存款审核员",
    user_account: "000235",
    isChecked: false,
  },
  {
    id: 8,
    role_number: "JS07",
    role_name: "异常处理岗",
    user_account: "000238",
    isChecked: true, // 是否勾选
    isMainRole: true, // 是否主岗
  },
  {
    id: 9,
    role_number: "JS09",
    role_name: "异常处理岗6",
    user_account: "000236",
    isChecked: false, // 是否勾选
    isMainRole: false, // 是否主岗
  },
  {
    id: 10,
    role_number: "JS17",
    role_name: "异常处理6",
    user_account: "000236",
    isChecked: true, // 是否勾选
    isMainRole: false, // 是否主岗
  },
];
const getList = () => list;
const getRoles = () => roles;
export const tellerMock = [
  {
    url: "/api/teller/list", //列表请求地址
    method: "get",
    response: ({ query }) => {
      let data = getList();

      const { page, pageSize, teller_no, org_number } = query;
      if (org_number) {
        data = data.filter((item) => item.org_number === org_number);
      }
      if (teller_no) {
        data = data.filter((item) => item.teller_no === teller_no);
      }
      let total = data.length;
      let newdata = getTableData(page, pageSize, data);
      return { code: 200, data: newdata, total, message: "请求成功" };
    },
  },
  {
    url: "/api/teller/roles", // 获取角色列表
    method: "get",
    response: ({ query }) => {
      const data = getRoles();
      const { user_account } = query;
      const newData = data.filter(
        (item: any) => item.user_account === user_account,
      );
      return { code: 200, data: newData, message: "请求成功" };
    },
  },
  {
    url: "/api/teller/rolesupdate", // 角色设置
    method: "post",
    response: (data) => {
      // data.body => {data:[全量数据]}
      let { list } = data.body;
      let no = list[0].user_account;
      const data1 = getRoles();
      let array = data1.filter((item) => item.user_account !== no);
      roles = [...array, ...list];
      return { code: 200, data: list, message: "请求成功" };
    },
  },
  {
    url: "/api/teller/del", //删除
    method: "post",
    response: (data) => {
      let index = list.findIndex((item) => item.id === data.body.id);
      list.splice(index, 1);
      return { code: 200, data: "", message: "请求成功" };
    },
  },
  {
    url: "/api/teller/update", //更新 添加
    method: "post",
    response: (data) => {
      if (data.body.id) {
        //编辑
        let index = list.findIndex((item) => item.id === data.body.id);
        list[index] = { ...data.body };
      } else {
        //添加
        list.push({ id: 5, ...data.body });
      }
      return { code: 200, data: "", message: "请求成功" };
    },
  },
];
