function getList() {
  return [
    {
      teller_no: 1, //柜员号
      teller_name: 1, //柜员名称
      teller_type_me: 1, //柜员类型  mydefined
      teller_source_me: 1, //柜员来源 mydefined
      org_number: 1, //机构号
      org_name: 1, //机构号
      teller_status: 1, //柜员状态
      telephoe: 138888888, // 柜员电话
      mobile: 138888888, // 手机号
      sex: 1, // 性别
      en_name: "tom", // 英文名称
      teller_level: 1, //柜员级别
      remark: "hello world",
    },
    {
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
      remark: "hello world",
    },
    {
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
      remark: "hello world",
    },
  ];
}
//用户信息数据
function createUserList() {
  return [
    {
      userId: 1,
      avatar:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      username: "admin",
      password: "111111",
      desc: "平台管理员",
      roles: ["平台管理员"],
      buttons: ["cuser.detail"],
      routes: ["home"],
      token: "Admin Token",
    },
    {
      userId: 2,
      avatar:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      username: "system",
      password: "111111",
      desc: "系统管理员",
      roles: ["系统管理员"],
      buttons: ["cuser.detail", "cuser.user"],
      routes: ["home"],
      token: "System Token",
    },
  ];
}

export const userMock = [
  // 用户登录接口
  {
    url: "/api/user/login", //请求地址
    method: "post", //请求方式
    response: ({ body }) => {
      //获取请求体携带过来的用户名与密码
      const { username, password } = body;
      //调用获取用户信息函数,用于判断是否有此用户
      const checkUser = createUserList().find(
        (item) => item.username === username && item.password === password,
      );
      //没有用户返回失败信息
      if (!checkUser) {
        return { code: 201, data: { message: "账号或者密码不正确" } };
      }
      //如果有返回成功信息
      const { token } = checkUser;
      return { code: 200, data: token };
    },
  },
  // 获取用户信息
  {
    url: "/api/user/info",
    method: "get",
    response: (request) => {
      //获取请求头携带token
      const token = request.headers.token;
      //查看用户信息是否包含有次token用户
      const checkUser = createUserList().find((item) => item.token === token);
      //没有返回失败的信息
      if (!checkUser) {
        return { code: 201, data: { message: "获取用户信息失败" } };
      }
      //如果有返回成功信息
      return { code: 200, data: { checkUser } };
    },
  },
];
