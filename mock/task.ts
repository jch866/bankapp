//  mydefined 代表自定义的
import { filterData } from "./tool";
function getList() {
  return [
    {
      id: 1,
      stepname: "碎片录入", //节点名称
      red_personal: 1, //红色预警-个人待处理
      red_public: 2, //红色预警-公共待处理
      red_sum: 40, //红色预警-笔数(明细)
      yellow_personal: 1, //黄色预警-个人待处理
      yellow_public: 2, //黄色预警-公共待处理
      yellow_sum: 30, //黄色预警-笔数(明细)
      normal_personal: 0, //正常节点-个人待处理
      normal_public: 0, //正常节点-公共待处理
      normal_sum: 20, //正常节点-笔数(明细)
    },
    {
      id: 2,
      stepname: "全单补录", //节点名称
      red_personal: 45,
      red_public: 20,
      red_sum: 65,
      yellow_personal: 51,
      yellow_public: 24,
      yellow_sum: 75,
      normal_personal: 0,
      normal_public: 0,
      normal_sum: 0,
    },
    {
      id: 3,
      stepname: "中心查复", //节点名称
      red_personal: 8,
      red_public: 2,
      red_sum: 10,
      yellow_personal: 100,
      yellow_public: 210,
      yellow_sum: 310,
      normal_personal: 0,
      normal_public: 0,
      normal_sum: 0,
    },
    {
      id: 4,
      stepname: "特殊审核授权", //节点名称
      red_personal: 8,
      red_public: 2,
      red_sum: 45,
      yellow_personal: 100,
      yellow_public: 210,
      yellow_sum: 260,
      normal_personal: 0,
      normal_public: 0,
      normal_sum: 0,
    },
    {
      id: 5,
      stepname: "贷款审核授权", //节点名称
      red_personal: 8,
      red_public: 2,
      red_sum: 187,
      yellow_personal: 100,
      yellow_public: 210,
      yellow_sum: 110,
      normal_personal: 0,
      normal_public: 0,
      normal_sum: 0,
    },
  ];
}
export const taskMock = [
  {
    url: "/api/tasklist", //任务预警列表请求地址
    method: "get",
    response: ({ query }) => {
      const data = getList();
      let newData: any = [];
      const { stepname, org_type, flow_type } = query;
      if (stepname) {
        newData = data.filter((item) => item.stepname === stepname);
      } else {
        newData = data;
      }
      // if(org_type){ // 表格中暂无此字段数据 org_type flow_type
      //   newData = data.filter(item=>item.org_type === org_type)
      // }
      // if(flow_type){
      //   newData = data.filter(item=>item.stepname === stepname)
      // }
      return { code: 200, data: newData, message: "请求成功" };
    },
  },
];
