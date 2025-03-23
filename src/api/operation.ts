import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
import Cookies from "js-cookie";

type ResultTable = {
  success: boolean;
  data: {
    /** 列表数据 */
    records: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  };
};

type UserResult = {
  success: boolean;
};

// 从 Cookie 中获取 authorized-token
const authorizedToken = Cookies.get("authorized-token");

/** 获取漏洞 */
export const getVuln = (data?: object) => {
  // 将 data 对象转换为查询参数字符串
  const queryParams = data
    ? `?${new URLSearchParams(data as Record<string, string>).toString()}`
    : "";
  return http.request<ResultTable>(
    "get",
    `${baseUrlApi("operation/vuln/page")}${queryParams}`,
    {
      data,
      headers: {
        Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
      }
    }
  );
};

/** 新增漏洞 */
export const addVuln = (data?: object) => {
  // 发起请求，将 token 添加到请求头中
  return http.request<UserResult>("post", baseUrlApi("operation/vuln"), {
    data,
    headers: {
      Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
    }
  });
};

/** 删除漏洞 */
export const delVuln = (data?: { ids: number[] | number }) => {
  let url = baseUrlApi("operation/vuln");

  // 处理查询参数
  if (data) {
    const ids = Array.isArray(data.ids) ? data.ids.join(",") : data.ids;
    url += `?ids=${ids}`;
  }

  return http.request<UserResult>("delete", url, {
    headers: {
      Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
    }
  });
};

/** 修改漏洞类型 */
export const reVuln = (data: {
  vulnId: number;
  vulnerabilityType: string;
  vulnerabilitySuggest: string;
}) => {
  const { vulnId, ...requestData } = data;
  // 发起请求，将 token 添加到请求头中
  return http.request<UserResult>(
    "put",
    baseUrlApi(`operation/vuln/${vulnId}`),
    {
      data: requestData,
      headers: {
        Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
      }
    }
  );
};

/** 获取风险 */
export const getRisk = (data?: object) => {
  // 将 data 对象转换为查询参数字符串
  const queryParams = data
    ? `?${new URLSearchParams(data as Record<string, string>).toString()}`
    : "";
  return http.request<ResultTable>(
    "get",
    `${baseUrlApi("operation/risk/page")}${queryParams}`,
    {
      data,
      headers: {
        Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
      }
    }
  );
};

/** 新增漏洞 */
export const addRisk = (data?: object) => {
  // 发起请求，将 token 添加到请求头中
  return http.request<UserResult>("post", baseUrlApi("operation/risk"), {
    data,
    headers: {
      Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
    }
  });
};

/** 删除漏洞 */
export const delRisk = (data?: { ids: number[] | number }) => {
  let url = baseUrlApi("operation/risk");

  // 处理查询参数
  if (data) {
    const ids = Array.isArray(data.ids) ? data.ids.join(",") : data.ids;
    url += `?ids=${ids}`;
  }

  return http.request<UserResult>("delete", url, {
    headers: {
      Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
    }
  });
};

/** 修改漏洞类型 */
export const reRisk = (data: {
  riskId: number;
  riskName: string;
  repairPeriod: number;
}) => {
  const { riskId, ...requestData } = data;
  // 发起请求，将 token 添加到请求头中
  return http.request<UserResult>(
    "put",
    baseUrlApi(`operation/risk/${riskId}`),
    {
      data: requestData,
      headers: {
        Authorization: `Bearer ${authorizedToken}` // 使用模板字符串正确拼接 token
      }
    }
  );
};
