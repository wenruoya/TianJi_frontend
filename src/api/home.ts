import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
import Cookies from "js-cookie";

type ResultTable = {
  success: boolean;
  data: {
    total?: number;
    extended?: number;
    sevenDay?: number;
    finish?: number;
    status: Array<any>;
    risk: Array<any>;
    vuln: Array<any>;
  };
};

const authorizedToken = Cookies.get("authorized-token");

export const getTrend = (data?: object) => {
  // 发起请求，将 token 添加到请求头中
  return http.request<ResultTable>("get", baseUrlApi("trend"), {
    data,
    headers: {
      Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
    }
  });
};
