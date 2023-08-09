//  mydefined 代表自定义的

function getList() {
  return [
    {
      id: 1,
      teller_no: 1, //柜员号
      teller_name: 1, //柜员名称
      teller_type_me: 1, //柜员类型  mydefined
      teller_source_me: 1, //柜员来源 mydefined
      org_number: 1, //机构号
      org_name: 1, //机构号
      teller_status: 1, //柜员状态
      telephone: 138888888, // 柜员电话
      mobile: 138888888, // 手机号
      sex: 1, // 性别
      en_name: "tom", // 英文名称
      teller_level: 1, //柜员级别
      workdate: "2000-01-01", //工作日期
      remark: "hello world",
    },
    {
      id: 2,
      teller_no: 2, //柜员号
      teller_name: 2, //柜员名称
      teller_type_me: 2, //柜员类型  mydefined
      teller_source_me: 2, //柜员来源 mydefined
      org_number: 2, //机构号
      org_name: 2, //机构号
      teller_status: 2, //柜员状态
      telephoe: 238888888, // 柜员电话
      mobile: 238888888, // 手机号
      sex: 2, // 性别
      en_name: "tom", // 英文名称
      teller_level: 2, //柜员级别
      workdate: "2000-01-01", //工作日期
      remark: "hello world",
    },
    {
      id: 3,
      teller_no: 3, //柜员号
      teller_name: 3, //柜员名称
      teller_type_me: 3, //柜员类型  mydefined
      teller_source_me: 3, //柜员来源 mydefined
      org_number: 3, //机构号
      org_name: 3, //机构号
      teller_status: 3, //柜员状态
      telephoe: 338888888, // 柜员电话
      mobile: 338888888, // 手机号
      sex: 3, // 性别
      en_name: "tom", // 英文名称
      teller_level: 3, //柜员级别
      workdate: "2000-01-01", //工作日期
      remark: "hello world",
    },
  ];
}
export const tellerMock = [
  {
    url: "/api/tellerlist", //列表请求地址
    method: "get",
    response: () => {
      const data = getList();
      return { code: 200, data, message: "请求成功" };
    },
  },
  {
    url: "/api/del_teller", //删除
    method: "get",
    response: () => {
      return { code: 200, data: "", message: "请求成功" };
    },
  },
  {
    url: "/api/del_update", //更新 添加
    method: "get",
    response: () => {
      return { code: 200, data: "", message: "请求成功" };
    },
  },
];
