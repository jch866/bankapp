//  mydefined 代表自定义的

function getList() {
  return [
    {
      id: 1,
      instance_startdate: "2000-01-01 10:00:00", //流程发起时间
      instance_enddate: "2000-01-01 10:00:00", //流程结束时间
      trace: "123", //业务流水号
      txcode: "123", //交易码
      bpdname: "123", //流程名称
      allocate_channel: "123", //渠道来源 汇划渠道
      tx_money: "123", //交易金额
      instance_status: 1, //流程状态
      org_number: 1, //发起机构号
      org_name: 1, //发起机构名称
      teller_name: 1, //发起柜员名称
      teller_no: 1, //柜员号
    },
    {
      id: 2,
      instance_startdate: "2000-02-02 10:00:00", //流程发起时间
      instance_enddate: "2000-02-02 10:00:00", //流程结束时间
      trace: "223", //业务流水号
      txcode: "223", //交易码
      bpdname: "223", //流程名称
      allocate_channel: "223", //渠道来源 汇划渠道
      tx_money: "223", //交易金额
      instance_status: 2, //流程状态
      org_number: 2, //发起机构号
      org_name: 2, //发起机构名称
      teller_name: 2, //发起柜员名称
      teller_no: 2, //柜员号
    },
    {
      id: 3,
      instance_startdate: "2000-03-03 10:00:00", //流程发起时间
      instance_enddate: "2000-03-03 10:00:00", //流程结束时间
      trace: "323", //业务流水号
      txcode: "323", //交易码
      bpdname: "323", //流程名称
      allocate_channel: "323", //渠道来源 汇划渠道
      tx_money: "323", //交易金额
      instance_status: 3, //流程状态
      org_number: 3, //发起机构号
      org_name: 3, //发起机构名称
      teller_name: 3, //发起柜员名称
      teller_no: 3, //柜员号
    },
  ];
}
export const flowMock = [
  {
    url: "/api/flowlist", //流程列表请求地址
    method: "get",
    response: () => {
      const data = getList();
      return { code: 200, data, message: "请求成功" };
    },
  },
];
