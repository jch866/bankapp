//  mydefined 代表自定义的
import { getTableData } from "./tool";
function getList() {
  return [
    {
      id: 1,
      instance_startdate: "2000-01-01 10:00:00", //流程发起时间
      instance_enddate: "2000-01-01 10:00:00", //流程结束时间
      trace: "123", //业务流水号
      txcode: "900201", //交易码
      bpdname: "123", //流程名称
      allocate_channel: "123", //渠道来源 汇划渠道
      tx_money: "123", //交易金额
      instance_status: "03", //流程状态
      org_number: "01294", //发起机构号
      org_name: "XXXX支行", //发起机构名称
      teller_name: 1, //发起柜员名称
      teller_no: 1, //柜员号
    },
    {
      id: 2,
      instance_startdate: "2000-02-02 10:00:00", //流程发起时间
      instance_enddate: "2000-02-02 10:00:00", //流程结束时间
      trace: "223", //业务流水号
      txcode: "905102", //交易码
      bpdname: "223", //流程名称
      allocate_channel: "223", //渠道来源 汇划渠道
      tx_money: "223", //交易金额
      instance_status: "01", //流程状态
      org_number: "01292", //发起机构号
      org_name: "运营管理部集中作业中心", //发起机构名称
      teller_name: 2, //发起柜员名称
      teller_no: 2, //柜员号
    },
    {
      id: 3,
      instance_startdate: "2000-03-03 10:00:00", //流程发起时间
      instance_enddate: "2000-03-03 10:00:00", //流程结束时间
      trace: "323", //业务流水号
      txcode: "900101", //交易码
      bpdname: "323", //流程名称
      allocate_channel: "323", //渠道来源 汇划渠道
      tx_money: "323", //交易金额
      instance_status: "02", //流程状态
      org_number: "01001", //发起机构号
      org_name: "会计核算中心", //发起机构名称
      teller_name: 3, //发起柜员名称
      teller_no: 3, //柜员号
    },
  ];
}
export const flowMock = [
  {
    url: "/api/flowlist", //流程列表请求地址
    method: "get",
    response: ({ query }) => {
      let data = getList();
      // org_type 暂无搜索
      const {
        page,
        pageSize,
        instance_startdate,
        instance_enddate,
        org_type,
        org_number,
        txcode,
        instance_status,
        teller_no,
        trace,
      } = query;
      if (instance_startdate) {
        const time = new Date(instance_startdate);
        data = data.filter((item) => new Date(item.instance_startdate) > time);
      }
      if (instance_enddate) {
        const time = new Date(instance_enddate);
        data = data.filter((item) => new Date(item.instance_enddate) < time);
      }
      if (org_number) {
        data = data.filter((item) => item.org_number === org_number);
      }
      if (txcode) {
        data = data.filter((item) => item.txcode === txcode);
      }
      if (instance_status) {
        data = data.filter((item) => item.instance_status === instance_status);
      }
      if (teller_no) {
        data = data.filter((item) => item.teller_no === teller_no);
      }
      if (trace) {
        data = data.filter((item) => item.trace === trace);
      }
      let total = data.length;
      let newdata = getTableData(page, pageSize, data);
      return { code: 200, data: newdata, total, message: "请求成功" };
    },
  },
];
