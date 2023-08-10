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
  },
];
const getList = () => list;

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
      // console.log(data.body)
      // {
      //   teller_no: '123',
      //   teller_name: '123',
      //   telephone: '123',
      //   mobile: '123',
      //   en_name: '123',
      //   sex: 1,
      //   teller_level: '123',
      //   org_number: '123',
      //   teller_status: 'shanghai',
      //   teller_type: 'shanghai'
      // },
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
