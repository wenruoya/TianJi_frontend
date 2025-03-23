import { dayjs, cloneDeep, getRandomIntBetween } from "./utils";
import GroupLine from "@iconify-icons/ri/group-line";
import Question from "@iconify-icons/ri/question-answer-line";
import CheckLine from "@iconify-icons/ri/chat-check-line";
import Smile from "@iconify-icons/ri/star-smile-line";
import { getTrend } from "@/api/home";

const days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

/** 需求人数、提问数量、解决数量、用户满意度 */
const chartData = [
  {
    icon: GroupLine,
    bgColor: "#effaff",
    color: "#41b6ff",
    duration: 2200,
    name: "总风险数",
    value: 0
  },
  {
    icon: Question,
    bgColor: "#fff5f4",
    color: "#e85f33",
    duration: 1600,
    name: "超期风险数",
    value: 0
  },
  {
    icon: CheckLine,
    bgColor: "#eff8f4",
    color: "#26ce83",
    duration: 1500,
    name: "近7天风险数",
    value: 0
  },
  {
    icon: Smile,
    bgColor: "#f6f4fe",
    color: "#7846e5",
    duration: 100,
    name: "已处置风险数",
    value: 0
  }
];

/** 分析概览 */
const barChartData = [
  {
    requireData: []
    // questionData: [2216, 1148, 1255, 1788, 4821, 1973, 4379]
  },
  {
    requireData: []
    // questionData: [2116, 3148, 3255, 3788, 4821, 4970, 5390]
  }
];

/** 最新动态 */
// const latestNewsData = cloneDeep(tableData)
//   .slice(0, 14)
//   .map((item, index) => {
//     return Object.assign(item, {
//       date: `${dayjs().subtract(index, "day").format("YYYY-MM-DD")} ${
//         days[dayjs().subtract(index, "day").day()]
//       }`
//     });
//   });

const { data } = await getTrend();
chartData[0].value = data.total;
chartData[1].value = data.extended;
chartData[2].value = data.sevenDay;
chartData[3].value = data.finish;

// 生成 progressData
const progressData = data.risk
  .map(item => {
    // 根据 percentage 计算 duration
    const duration = data.total - item.count;
    // 根据 percentage 设置 color
    const color = (item.count / data.total) * 100 >= 50 ? "#26ce83" : "#41b6ff";
    return {
      week: item.riskName,
      percentage: (item.count / data.total) * 100,
      duration: duration,
      color: color
    };
  })
  .reverse(); // 最后反转数组

const tableData = data.vuln.map((item, index) => {
  return {
    id: index + 1,
    questionNumber: item.vulnerabilityType,
    resolveNumber: item.count
  };
});

const requireData1: number[] = data.status.map(item => item.count);
barChartData[0].requireData = requireData1;
barChartData[1].requireData = requireData1;
export { chartData, barChartData, progressData, tableData };
